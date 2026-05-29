import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";
import { createId, ConversationRow, getDb, MessageRow, nowIso } from "./db";

export type ChatMeta = {
  conversationId?: string;
  visitorId?: string;
  pageUrl?: string;
  referrer?: string;
};

type LeadSignal = {
  leadScore: number;
  leadType: string;
  leadReason: string;
};

type ConversationMeta = {
  id: string;
  visitorId: string;
  pageUrl: string | null;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  visitorIp: string | null;
  visitorIpHash: string | null;
  userAgent: string | null;
  countryOrRegion: string | null;
  city: string | null;
};

function safeString(value: unknown, max = 2000) {
  return typeof value === "string" && value.trim()
    ? value.trim().slice(0, max)
    : null;
}

function getHeader(request: NextRequest, name: string) {
  return request.headers.get(name) || request.headers.get(name.toLowerCase());
}

export function detectVisitorIp(request: NextRequest) {
  const forwarded = getHeader(request, "x-forwarded-for");
  const firstForwarded = forwarded?.split(",")[0]?.trim();

  return (
    getHeader(request, "cf-connecting-ip") ||
    firstForwarded ||
    getHeader(request, "x-real-ip") ||
    null
  );
}

function hashIp(ip: string | null) {
  if (!ip) return null;
  const salt = process.env.ADMIN_SESSION_SECRET || "local-dev-ip-hash";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

function utmFromUrl(pageUrl: string | null) {
  if (!pageUrl) {
    return { utmSource: null, utmMedium: null, utmCampaign: null };
  }

  try {
    const url = new URL(pageUrl);
    return {
      utmSource: safeString(url.searchParams.get("utm_source"), 200),
      utmMedium: safeString(url.searchParams.get("utm_medium"), 200),
      utmCampaign: safeString(url.searchParams.get("utm_campaign"), 200),
    };
  } catch {
    return { utmSource: null, utmMedium: null, utmCampaign: null };
  }
}

export function scoreLead(content: string): LeadSignal {
  const text = content.toLowerCase();

  if (/\b(hire|hiring|recruiter|role|job|opportunity|interview|cv|resume)\b/.test(text)) {
    return {
      leadScore: 8,
      leadType: "hiring",
      leadReason: "Visitor asked about hiring, recruiting, role fit, or CV/resume.",
    };
  }

  if (/\b(consulting|freelance|project|collaborate|collaboration)\b/.test(text)) {
    return {
      leadScore: 7,
      leadType: "consulting",
      leadReason: "Visitor asked about consulting, freelance work, projects, or collaboration.",
    };
  }

  if (/\b(contact|email|phone|linkedin|available|availability|salary|compensation)\b/.test(text)) {
    return {
      leadScore: 6,
      leadType: "collaboration",
      leadReason: "Visitor asked about contact, availability, or compensation-related information.",
    };
  }

  return {
    leadScore: Math.min(3, Math.max(1, Math.ceil(content.length / 300))),
    leadType: "general_question",
    leadReason: "Visitor asked a general portfolio question.",
  };
}

export function buildConversationMeta(request: NextRequest, meta: ChatMeta): ConversationMeta {
  const pageUrl = safeString(meta.pageUrl, 1000);
  const referrer = safeString(meta.referrer, 1000) || safeString(getHeader(request, "referer"), 1000);
  const { utmSource, utmMedium, utmCampaign } = utmFromUrl(pageUrl);
  const visitorIp = detectVisitorIp(request);

  return {
    id: safeString(meta.conversationId, 120) || createId("conv"),
    visitorId: safeString(meta.visitorId, 120) || createId("visitor"),
    pageUrl,
    referrer,
    utmSource,
    utmMedium,
    utmCampaign,
    visitorIp,
    visitorIpHash: hashIp(visitorIp),
    userAgent: safeString(getHeader(request, "user-agent"), 1000),
    countryOrRegion:
      safeString(getHeader(request, "cf-ipcountry"), 100) ||
      safeString(getHeader(request, "cf-region"), 100),
    city: safeString(getHeader(request, "cf-ipcity"), 100),
  };
}

export function upsertConversation(meta: ConversationMeta, lead: LeadSignal) {
  const db = getDb();
  const now = nowIso();
  const existing = db
    .prepare("SELECT lead_score, lead_type, lead_reason FROM conversations WHERE id = ?")
    .get(meta.id) as { lead_score: number; lead_type: string; lead_reason: string | null } | undefined;

  if (!existing) {
    db.prepare(`
      INSERT INTO conversations (
        id, visitor_id, started_at, updated_at, page_url, referrer,
        utm_source, utm_medium, utm_campaign, visitor_ip, visitor_ip_hash,
        user_agent, country_or_region, city, lead_score, lead_type,
        lead_reason, reviewed, archived
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0)
    `).run(
      meta.id,
      meta.visitorId,
      now,
      now,
      meta.pageUrl,
      meta.referrer,
      meta.utmSource,
      meta.utmMedium,
      meta.utmCampaign,
      meta.visitorIp,
      meta.visitorIpHash,
      meta.userAgent,
      meta.countryOrRegion,
      meta.city,
      lead.leadScore,
      lead.leadType,
      lead.leadReason,
    );
    return;
  }

  const shouldUpdateLead = lead.leadScore >= existing.lead_score;
  db.prepare(`
    UPDATE conversations
    SET
      visitor_id = ?,
      updated_at = ?,
      page_url = COALESCE(?, page_url),
      referrer = COALESCE(?, referrer),
      utm_source = COALESCE(?, utm_source),
      utm_medium = COALESCE(?, utm_medium),
      utm_campaign = COALESCE(?, utm_campaign),
      visitor_ip = COALESCE(?, visitor_ip),
      visitor_ip_hash = COALESCE(?, visitor_ip_hash),
      user_agent = COALESCE(?, user_agent),
      country_or_region = COALESCE(?, country_or_region),
      city = COALESCE(?, city),
      lead_score = ?,
      lead_type = ?,
      lead_reason = ?
    WHERE id = ?
  `).run(
    meta.visitorId,
    now,
    meta.pageUrl,
    meta.referrer,
    meta.utmSource,
    meta.utmMedium,
    meta.utmCampaign,
    meta.visitorIp,
    meta.visitorIpHash,
    meta.userAgent,
    meta.countryOrRegion,
    meta.city,
    shouldUpdateLead ? lead.leadScore : existing.lead_score,
    shouldUpdateLead ? lead.leadType : existing.lead_type,
    shouldUpdateLead ? lead.leadReason : existing.lead_reason,
    meta.id,
  );
}

export function getConversationSession(conversationId: string) {
  return getDb()
    .prepare("SELECT id, visitor_id FROM conversations WHERE id = ?")
    .get(conversationId) as { id: string; visitor_id: string } | undefined;
}

export function getConversationMessagesForContext(conversationId: string) {
  return getDb()
    .prepare(`
      SELECT role, content FROM messages
      WHERE conversation_id = ?
      ORDER BY created_at ASC
    `)
    .all(conversationId) as Array<{ role: "user" | "assistant"; content: string }>;
}

export function saveMessage(conversationId: string, role: "user" | "assistant", content: string) {
  getDb().prepare(`
    INSERT INTO messages (id, conversation_id, role, content, created_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(createId("msg"), conversationId, role, content.slice(0, 10000), nowIso());
}

export function listConversations() {
  return getDb().prepare(`
    SELECT
      c.*,
      (
        SELECT content FROM messages
        WHERE conversation_id = c.id AND role = 'user'
        ORDER BY created_at DESC
        LIMIT 1
      ) AS last_user_message
    FROM conversations c
    WHERE archived = 0
    ORDER BY updated_at DESC
    LIMIT 200
  `).all() as Array<ConversationRow & { last_user_message: string | null }>;
}

export function getConversation(id: string) {
  const conversation = getDb()
    .prepare("SELECT * FROM conversations WHERE id = ?")
    .get(id) as ConversationRow | undefined;
  if (!conversation) return null;

  const messages = getDb()
    .prepare("SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC")
    .all(id) as MessageRow[];

  return { conversation, messages };
}

export function getConversationStats() {
  return getDb().prepare(`
    SELECT
      COUNT(*) AS totalConversations,
      SUM(CASE WHEN lead_score >= 8 AND archived = 0 THEN 1 ELSE 0 END) AS highIntentLeads,
      SUM(CASE WHEN reviewed = 0 AND archived = 0 THEN 1 ELSE 0 END) AS unreviewed,
      MAX(updated_at) AS lastConversationDate
    FROM conversations
  `).get() as {
    totalConversations: number;
    highIntentLeads: number | null;
    unreviewed: number | null;
    lastConversationDate: string | null;
  };
}

export function patchConversation(
  id: string,
  changes: Partial<{ reviewed: boolean; archived: boolean }>,
) {
  const sets: string[] = [];
  const values: Array<number | string> = [];

  if (typeof changes.reviewed === "boolean") {
    sets.push("reviewed = ?");
    values.push(changes.reviewed ? 1 : 0);
  }

  if (typeof changes.archived === "boolean") {
    sets.push("archived = ?");
    values.push(changes.archived ? 1 : 0);
  }

  if (!sets.length) return false;

  values.push(id);
  const result = getDb().prepare(`UPDATE conversations SET ${sets.join(", ")} WHERE id = ?`).run(...values);
  return result.changes > 0;
}

export function deleteConversation(id: string) {
  const db = getDb();
  db.prepare("DELETE FROM messages WHERE conversation_id = ?").run(id);
  const result = db.prepare("DELETE FROM conversations WHERE id = ?").run(id);
  return result.changes > 0;
}

export async function notifyLeadIfConfigured(conversationId: string, lead: LeadSignal) {
  const webhookUrl = process.env.N8N_LEAD_WEBHOOK_URL;
  if (!webhookUrl || lead.leadScore < 8) return;

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId, ...lead }),
      signal: AbortSignal.timeout(5000),
    });
  } catch (error) {
    console.error("Lead webhook failed.", error);
  }
}
