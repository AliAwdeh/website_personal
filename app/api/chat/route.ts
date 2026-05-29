import { readFile } from "node:fs/promises";
import path from "node:path";
import type { NextRequest } from "next/server";
import {
  buildConversationMeta,
  getConversationMessagesForContext,
  getConversationSession,
  notifyLeadIfConfigured,
  saveMessage,
  scoreLead,
  upsertConversation,
} from "@/lib/admin/chat-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequestBody = {
  messages?: unknown;
  visitor_id?: unknown;
  conversation_id?: unknown;
  page_url?: unknown;
  referrer?: unknown;
};

const OLLAMA_BASE_URL = (process.env.OLLAMA_BASE_URL ?? "http://192.168.0.133:11434").replace(/\/+$/, "");
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "mistral:7b-instruct";
const MAX_MESSAGES = 10;
const MAX_CONTENT_LENGTH = 2000;
const MAX_SESSION_ID_LENGTH = 120;

function cleanMessages(value: unknown): ChatMessage[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((message): message is ChatMessage => {
      if (!message || typeof message !== "object") return false;
      const candidate = message as Partial<ChatMessage>;
      return (
        (candidate.role === "user" || candidate.role === "assistant") &&
        typeof candidate.content === "string" &&
        candidate.content.trim().length > 0
      );
    })
    .slice(-MAX_MESSAGES)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, MAX_CONTENT_LENGTH),
    }));
}

async function loadSystemPrompt() {
  const promptPath = path.join(process.cwd(), "prompts", "website-assistant.md");
  const infoPath = path.join(process.cwd(), "prompts", "ali-info.md");
  const [assistantPrompt, aliInfo] = await Promise.all([
    readFile(promptPath, "utf8"),
    readFile(infoPath, "utf8"),
  ]);

  return `${assistantPrompt}\n\n${aliInfo}`;
}

function friendlyError(message: string, status = 503) {
  return new Response(message, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function cleanSessionValue(value: unknown) {
  return typeof value === "string" && value.trim()
    ? value.trim().slice(0, MAX_SESSION_ID_LENGTH)
    : undefined;
}

function getOwnedConversationId(conversationId?: string, visitorId?: string) {
  if (!conversationId) return undefined;

  try {
    const existing = getConversationSession(conversationId);
    if (!existing) return conversationId;
    return visitorId && existing.visitor_id === visitorId ? conversationId : undefined;
  } catch (error) {
    console.error("Failed to verify chat conversation session.", error);
    return undefined;
  }
}

function cleanContextMessages(messages: ChatMessage[]) {
  return messages
    .filter((message) => message.role === "user" || message.role === "assistant")
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, MAX_CONTENT_LENGTH),
    }))
    .filter((message) => message.content.length > 0);
}

export async function POST(request: NextRequest) {
  let body: ChatRequestBody;

  try {
    body = await request.json();
  } catch {
    return friendlyError("Invalid chat request.", 400);
  }

  const messages = cleanMessages(body.messages);

  if (!messages.length) {
    return friendlyError("Please send a message to start the chat.", 400);
  }

  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");
  const visitorId = cleanSessionValue(body.visitor_id);
  const requestedConversationId = cleanSessionValue(body.conversation_id);
  const conversationId = getOwnedConversationId(requestedConversationId, visitorId);
  const conversationMeta = buildConversationMeta(request, {
    conversationId,
    visitorId,
    pageUrl: typeof body.page_url === "string" ? body.page_url : undefined,
    referrer: typeof body.referrer === "string" ? body.referrer : undefined,
  });
  const lead = scoreLead(latestUserMessage?.content ?? "");

  try {
    upsertConversation(conversationMeta, lead);
    if (latestUserMessage) {
      saveMessage(conversationMeta.id, "user", latestUserMessage.content);
      void notifyLeadIfConfigured(conversationMeta.id, lead);
    }
  } catch (error) {
    console.error("Failed to save chat conversation.", error);
  }

  let contextMessages = messages;

  try {
    const savedMessages = cleanContextMessages(getConversationMessagesForContext(conversationMeta.id));
    if (savedMessages.length) {
      contextMessages = savedMessages;
    }
  } catch (error) {
    console.error("Failed to load chat session history.", error);
  }

  let systemPrompt: string;

  try {
    systemPrompt = await loadSystemPrompt();
  } catch (error) {
    console.error("Failed to load website assistant prompt.", error);
    return friendlyError("The AI assistant is not configured yet.", 500);
  }

  let ollamaResponse: Response;

  try {
    ollamaResponse = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(20000),
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        stream: true,
        messages: [
          { role: "system", content: systemPrompt },
          ...contextMessages,
        ],
        options: {
          temperature: 0.2,
          top_k: 40,
          top_p: 0.9,
          num_ctx: 8000,
          repeat_penalty: 1.1,
        },
      }),
    });
  } catch (error) {
    console.error("Ollama request failed.", error);
    try {
      saveMessage(conversationMeta.id, "assistant", "The local AI server is currently unavailable.");
    } catch (saveError) {
      console.error("Failed to save assistant error message.", saveError);
    }

    const response = friendlyError("The local AI server is currently unavailable.");
    response.headers.set("X-Conversation-Id", conversationMeta.id);
    return response;
  }

  if (!ollamaResponse.ok) {
    const errorText = await ollamaResponse.text().catch(() => "");
    console.error("Ollama returned an error.", {
      status: ollamaResponse.status,
      body: errorText,
    });

    if (
      ollamaResponse.status === 404 ||
      errorText.toLowerCase().includes("model") ||
      errorText.includes(OLLAMA_MODEL)
    ) {
      const message = `The model ${OLLAMA_MODEL} is not available on the Ollama server.`;
      try {
        saveMessage(conversationMeta.id, "assistant", message);
      } catch (saveError) {
        console.error("Failed to save assistant model error message.", saveError);
      }

      const response = friendlyError(message, 404);
      response.headers.set("X-Conversation-Id", conversationMeta.id);
      return response;
    }

    try {
      saveMessage(conversationMeta.id, "assistant", "The local AI server is currently unavailable.");
    } catch (saveError) {
      console.error("Failed to save assistant server error message.", saveError);
    }
    const response = friendlyError("The local AI server is currently unavailable.");
    response.headers.set("X-Conversation-Id", conversationMeta.id);
    return response;
  }

  if (!ollamaResponse.body) {
    console.error("Ollama response did not include a stream body.");
    const response = friendlyError("The local AI server is currently unavailable.");
    response.headers.set("X-Conversation-Id", conversationMeta.id);
    return response;
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = ollamaResponse.body!.getReader();
      let buffer = "";
      let assistantContent = "";

      const processLine = (line: string) => {
        const trimmed = line.trim();
        if (!trimmed) return;

        try {
          const chunk = JSON.parse(trimmed) as {
            done?: boolean;
            error?: string;
            message?: { content?: string };
          };

          if (chunk.error) {
            console.error("Ollama stream chunk error.", chunk.error);
            if (chunk.error.includes(OLLAMA_MODEL) || chunk.error.toLowerCase().includes("model")) {
              controller.enqueue(
                encoder.encode(`The model ${OLLAMA_MODEL} is not available on the Ollama server.`),
              );
            } else {
              controller.enqueue(encoder.encode("The local AI server is currently unavailable."));
            }
            return;
          }

          if (chunk.message?.content) {
            assistantContent += chunk.message.content;
            controller.enqueue(encoder.encode(chunk.message.content));
          }
        } catch (error) {
          console.error("Failed to parse Ollama stream chunk.", error);
        }
      };

      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            buffer += decoder.decode();
            if (buffer) processLine(buffer);
            if (assistantContent.trim()) {
              try {
                saveMessage(conversationMeta.id, "assistant", assistantContent);
              } catch (error) {
                console.error("Failed to save assistant message.", error);
              }
            }
            controller.close();
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";
          lines.forEach(processLine);
        }
      } catch (error) {
        console.error("Failed while streaming Ollama response.", error);
        const message = "The local AI server is currently unavailable.";
        try {
          saveMessage(conversationMeta.id, "assistant", message);
        } catch (saveError) {
          console.error("Failed to save assistant stream error message.", saveError);
        }
        controller.enqueue(encoder.encode(message));
        controller.close();
      } finally {
        reader.releaseLock();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Conversation-Id": conversationMeta.id,
    },
  });
}
