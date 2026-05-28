import { mkdirSync } from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

export type ConversationRow = {
  id: string;
  visitor_id: string;
  started_at: string;
  updated_at: string;
  page_url: string | null;
  referrer: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  visitor_ip: string | null;
  visitor_ip_hash: string | null;
  user_agent: string | null;
  country_or_region: string | null;
  city: string | null;
  lead_score: number;
  lead_type: string;
  lead_reason: string | null;
  reviewed: number;
  archived: number;
};

export type MessageRow = {
  id: string;
  conversation_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
};

type Db = InstanceType<typeof DatabaseSync>;

let db: Db | null = null;

function getDbPath() {
  const dataDir = path.join(process.cwd(), ".data");
  mkdirSync(dataDir, { recursive: true });
  return path.join(dataDir, "chat-admin.sqlite");
}

export function getDb() {
  if (db) return db;

  db = new DatabaseSync(getDbPath());
  db.exec(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS conversations (
      id TEXT PRIMARY KEY,
      visitor_id TEXT NOT NULL,
      started_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      page_url TEXT,
      referrer TEXT,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      visitor_ip TEXT,
      visitor_ip_hash TEXT,
      user_agent TEXT,
      country_or_region TEXT,
      city TEXT,
      lead_score INTEGER NOT NULL DEFAULT 0,
      lead_type TEXT NOT NULL DEFAULT 'unknown',
      lead_reason TEXT,
      reviewed INTEGER NOT NULL DEFAULT 0,
      archived INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      conversation_id TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
      content TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_conversations_updated_at ON conversations(updated_at DESC);
    CREATE INDEX IF NOT EXISTS idx_conversations_lead_score ON conversations(lead_score DESC);
    CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id, created_at ASC);
  `);

  return db;
}

export function nowIso() {
  return new Date().toISOString();
}

export function createId(prefix: string) {
  return `${prefix}_${randomUUID()}`;
}
