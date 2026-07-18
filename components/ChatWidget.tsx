"use client";

import { FormEvent, KeyboardEvent, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { createBrowserId } from "@/lib/browser-id";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const MAX_INPUT_LENGTH = 2000;
const MAX_HISTORY_MESSAGES = 10;
const VISITOR_ID_KEY = "ali_chat_visitor_id";
const CONVERSATION_ID_KEY = "ali_chat_conversation_id";
const WHATSAPP_CHATBOT_URL = "https://wa.me/96171056438";
const OPEN_WEBSITE_CHAT_EVENT = "ali-open-website-chat";

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getStoredId(key: string, prefix: string) {
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;

  const id = createBrowserId(prefix);
  window.localStorage.setItem(key, id);
  return id;
}

function renderLinkedText(text: string): ReactNode[] {
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)|(https?:\/\/[^\s)]+)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const label = match[1] ?? match[3];
    const href = match[2] ?? match[3];

    nodes.push(
      <a
        key={`${href}-${match.index}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-brand-accent2 underline underline-offset-4 hover:opacity-90"
      >
        {label}
      </a>,
    );

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi, I can answer quick questions about Ali's AI, backend, automation, projects, and experience. For the active WhatsApp chatbot, try [Ali's WhatsApp chatbot](https://wa.me/96171056438).",
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !isStreaming, [input, isStreaming]);

  useEffect(() => {
    const openChat = () => setIsOpen(true);

    window.addEventListener(OPEN_WEBSITE_CHAT_EVENT, openChat);
    return () => window.removeEventListener(OPEN_WEBSITE_CHAT_EVENT, openChat);
  }, []);

  const scrollToEnd = () => {
    requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  };

  async function sendMessage() {
    const content = input.trim().slice(0, MAX_INPUT_LENGTH);
    if (!content || isStreaming) return;

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content,
    };
    const assistantId = createId();
    const assistantMessage: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
    };

    const nextMessages = [...messages, userMessage, assistantMessage];
    setMessages(nextMessages);
    setInput("");
    setIsStreaming(true);
    scrollToEnd();

    try {
      const visitorId = getStoredId(VISITOR_ID_KEY, "visitor");
      const conversationId = window.localStorage.getItem(CONVERSATION_ID_KEY);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage]
            .filter((message) => message.id !== "welcome")
            .slice(-MAX_HISTORY_MESSAGES)
            .map(({ role, content }) => ({ role, content })),
          visitor_id: visitorId,
          conversation_id: conversationId,
          page_url: window.location.href,
          referrer: document.referrer,
        }),
      });
      const nextConversationId = response.headers.get("X-Conversation-Id");
      if (nextConversationId) {
        window.localStorage.setItem(CONVERSATION_ID_KEY, nextConversationId);
      }

      if (!response.ok || !response.body) {
        const errorText = await response.text().catch(() => "");
        throw new Error(errorText || "The local AI server is currently unavailable.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        assistantContent += decoder.decode(value, { stream: true });
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId ? { ...message, content: assistantContent } : message,
          ),
        );
        scrollToEnd();
      }

      assistantContent += decoder.decode();
      setMessages((current) =>
        current.map((message) =>
          message.id === assistantId
            ? {
                ...message,
                content: assistantContent || "I could not generate a response. Please try again.",
              }
            : message,
        ),
      );
    } catch (error) {
      console.error("Chat request failed.", error);
      const message = error instanceof Error && error.message
        ? error.message
        : "The local AI server is currently unavailable.";

      setMessages((current) =>
        current.map((item) =>
          item.id === assistantId
            ? {
                ...item,
                content: message.includes("mistral:7b-instruct")
                  ? "The model mistral:7b-instruct is not available on the Ollama server."
                  : "The local AI server is currently unavailable.",
              }
            : item,
        ),
      );
    } finally {
      setIsStreaming(false);
      scrollToEnd();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          aria-label="Ask Ali's AI chat"
          className="mb-3 flex h-[min(620px,calc(100vh-7rem))] w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-brand-card/95 shadow-soft backdrop-blur"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div>
              <h2 className="font-semibold">Ask Ali's AI</h2>
              <p className="text-xs text-brand-dim">Portfolio assistant</p>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "bg-brand-accent/20 text-brand-fg"
                      : "border border-white/10 bg-white/5 text-brand-dim"
                  }`}
                >
                  {message.content ? renderLinkedText(message.content) : (isStreaming ? "Thinking..." : "")}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <form onSubmit={handleSubmit} className="border-t border-white/10 p-3">
            <a
              href={WHATSAPP_CHATBOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-3 flex min-h-10 items-center justify-center rounded-2xl border border-brand-accent bg-brand-accent/10 px-3 py-2 text-sm font-medium hover:bg-brand-accent/20"
            >
              Try the WhatsApp chatbot
            </a>
            <label className="sr-only" htmlFor="chat-message">
              Message for Ali's AI
            </label>
            <div className="flex items-end gap-2">
              <textarea
                id="chat-message"
                value={input}
                maxLength={MAX_INPUT_LENGTH}
                rows={2}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Ali's work..."
                className="min-h-11 flex-1 resize-none rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none placeholder:text-brand-dim/70 focus:border-brand-accent"
              />
              <button
                type="submit"
                aria-label="Send chat message"
                disabled={!canSend}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-brand-accent bg-brand-accent/15 text-brand-fg transition hover:bg-brand-accent/25 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-brand-dim">
              <span>{isStreaming ? "Streaming response..." : "Enter to send, Shift+Enter for a new line"}</span>
              <span>{input.length}/{MAX_INPUT_LENGTH}</span>
            </div>
          </form>
        </section>
      )}

      <button
        type="button"
        aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-3xl border border-brand-accent bg-brand-accent/15 text-brand-fg shadow-glow transition hover:bg-brand-accent/25"
      >
        {isOpen ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  );
}
