import { NextRequest, NextResponse } from "next/server";
import {
  buildConversationMeta,
  getConversationSession,
  upsertConversation,
} from "@/lib/admin/chat-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TrackRequestBody = {
  visitor_id?: unknown;
  conversation_id?: unknown;
  page_url?: unknown;
  referrer?: unknown;
};

const MAX_SESSION_ID_LENGTH = 120;

function cleanSessionValue(value: unknown) {
  return typeof value === "string" && value.trim()
    ? value.trim().slice(0, MAX_SESSION_ID_LENGTH)
    : undefined;
}

function getOwnedConversationId(conversationId?: string, visitorId?: string) {
  if (!conversationId) return undefined;

  const existing = getConversationSession(conversationId);
  if (!existing) return conversationId;
  return visitorId && existing.visitor_id === visitorId ? conversationId : undefined;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({} as TrackRequestBody));
  const visitorId = cleanSessionValue(body.visitor_id);
  const requestedConversationId = cleanSessionValue(body.conversation_id);
  const conversationId = getOwnedConversationId(requestedConversationId, visitorId);

  const conversationMeta = buildConversationMeta(request, {
    conversationId,
    visitorId,
    pageUrl: typeof body.page_url === "string" ? body.page_url : undefined,
    referrer: typeof body.referrer === "string" ? body.referrer : undefined,
  });

  try {
    upsertConversation(conversationMeta, {
      leadScore: 0,
      leadType: "visitor",
      leadReason: "Visitor viewed the website without using the chatbot yet.",
    });
  } catch (error) {
    console.error("Failed to track website visitor.", error);
    return NextResponse.json({ error: "Unable to track visit." }, { status: 500 });
  }

  const response = NextResponse.json({
    ok: true,
    visitor_id: conversationMeta.visitorId,
    conversation_id: conversationMeta.id,
  });
  response.headers.set("Cache-Control", "no-store");
  return response;
}
