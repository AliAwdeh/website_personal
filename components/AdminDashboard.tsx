"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Conversation = {
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
  last_user_message?: string | null;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
};

type Stats = {
  totalConversations: number;
  highIntentLeads: number | null;
  unreviewed: number | null;
  lastConversationDate: string | null;
};

type Detail = {
  conversation: Conversation;
  messages: Message[];
};

function formatDate(value: string | null) {
  if (!value) return "None yet";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function maskIp(ip: string | null) {
  if (!ip) return "Unknown";
  if (ip.includes(":")) return `${ip.slice(0, 12)}...`;
  const parts = ip.split(".");
  return parts.length === 4 ? `${parts[0]}.${parts[1]}.${parts[2]}.x` : ip;
}

function isSetupError(error: string) {
  return error.toLowerCase().includes("admin auth is not configured");
}

export function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<Detail | null>(null);
  const selectedConversation = useMemo(
    () => conversations.find((item) => item.id === selectedId) ?? null,
    [conversations, selectedId],
  );

  async function refreshConversations() {
    const response = await fetch("/api/admin/conversations", { cache: "no-store" });
    if (response.status === 401) {
      setAuthenticated(false);
      return;
    }

    const data = await response.json();
    setStats(data.stats);
    setConversations(data.conversations);
    setAuthenticated(true);
  }

  async function loadDetail(id: string) {
    setSelectedId(id);
    const response = await fetch(`/api/admin/conversations/${id}`, { cache: "no-store" });
    if (!response.ok) return;
    setDetail(await response.json());
  }

  useEffect(() => {
    void refreshConversations();
  }, []);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error ?? "Invalid login.");
      return;
    }

    setPassword("");
    setAuthenticated(true);
    await refreshConversations();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setStats(null);
    setConversations([]);
    setDetail(null);
  }

  async function patchSelected(changes: Partial<{ reviewed: boolean; archived: boolean }>) {
    if (!selectedId) return;
    await fetch(`/api/admin/conversations/${selectedId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(changes),
    });
    await refreshConversations();
    await loadDetail(selectedId);
  }

  async function deleteSelected() {
    if (!selectedId || !window.confirm("Delete this conversation permanently?")) return;
    await fetch(`/api/admin/conversations/${selectedId}`, { method: "DELETE" });
    setSelectedId(null);
    setDetail(null);
    await refreshConversations();
  }

  if (authenticated === null) {
    return (
      <section className="container py-16">
        <div className="card p-6">Loading admin dashboard...</div>
      </section>
    );
  }

  if (!authenticated) {
    return (
      <section className="container flex min-h-[70vh] items-center justify-center py-16">
        <form onSubmit={handleLogin} className="card w-full max-w-md p-6">
          <h1 className="text-2xl font-semibold">Admin Login</h1>
          <p className="p-dim mt-2">Enter the admin password to review chat conversations.</p>
          <label className="mt-6 block text-sm" htmlFor="admin-password">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 min-h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-3 outline-none focus:border-brand-accent"
          />
          {error && (
            <div className="mt-3 rounded-2xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-100">
              <p>{error}</p>
              {isSetupError(error) && (
                <div className="mt-3 space-y-2 text-red-100/80">
                  <p>Generate local admin env values, then restart the dev server:</p>
                  <code className="block break-words rounded-xl bg-black/30 p-2 text-xs">
                    npm run admin:hash -- your-password
                  </code>
                  <p>Add the printed values to <span className="font-mono">.env.local</span>.</p>
                </div>
              )}
            </div>
          )}
          <button className="btn btn-accent mt-6 w-full" type="submit">
            Login
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="container py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Chat Admin</h1>
          <p className="p-dim mt-1">Hidden dashboard for conversations and possible leads.</p>
        </div>
        <button className="btn" type="button" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="card p-5">
          <p className="p-dim text-sm">Total conversations</p>
          <p className="mt-2 text-3xl font-bold">{stats?.totalConversations ?? 0}</p>
        </div>
        <div className="card p-5">
          <p className="p-dim text-sm">High-intent leads</p>
          <p className="mt-2 text-3xl font-bold">{stats?.highIntentLeads ?? 0}</p>
        </div>
        <div className="card p-5">
          <p className="p-dim text-sm">Unreviewed</p>
          <p className="mt-2 text-3xl font-bold">{stats?.unreviewed ?? 0}</p>
        </div>
        <div className="card p-5">
          <p className="p-dim text-sm">Last conversation</p>
          <p className="mt-2 text-sm">{formatDate(stats?.lastConversationDate ?? null)}</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="card overflow-hidden">
          <div className="border-b border-white/10 p-4">
            <h2 className="font-semibold">Conversations</h2>
          </div>
          <div className="max-h-[720px] overflow-y-auto">
            {conversations.length === 0 && (
              <p className="p-dim p-4">No conversations yet.</p>
            )}
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                type="button"
                onClick={() => void loadDetail(conversation.id)}
                className={`block w-full border-b border-white/10 p-4 text-left hover:bg-white/5 ${
                  conversation.id === selectedId ? "bg-white/10" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm">{formatDate(conversation.updated_at)}</span>
                  <span className="rounded-xl border border-white/10 px-2 py-1 text-xs">
                    {conversation.lead_score}/10 {conversation.lead_type}
                  </span>
                </div>
                <p className="p-dim mt-2 line-clamp-2 text-sm">
                  {conversation.last_user_message ?? "No user message preview."}
                </p>
                <div className="p-dim mt-2 flex flex-wrap gap-2 text-xs">
                  <span>{conversation.reviewed ? "Reviewed" : "Unreviewed"}</span>
                  <span>{maskIp(conversation.visitor_ip)}</span>
                  <span>{[conversation.city, conversation.country_or_region].filter(Boolean).join(", ") || "Unknown location"}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="card p-5">
          {!detail && (
            <p className="p-dim">Select a conversation to view metadata and messages.</p>
          )}
          {detail && (
            <div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Conversation Detail</h2>
                  <p className="p-dim mt-1 text-sm">{selectedConversation?.lead_reason}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="btn" type="button" onClick={() => void patchSelected({ reviewed: !detail.conversation.reviewed })}>
                    {detail.conversation.reviewed ? "Mark Unreviewed" : "Mark Reviewed"}
                  </button>
                  <button className="btn" type="button" onClick={() => void patchSelected({ archived: true })}>
                    Archive
                  </button>
                  <button className="btn" type="button" onClick={() => void deleteSelected()}>
                    Delete
                  </button>
                </div>
              </div>

              <dl className="mt-5 grid gap-3 text-sm md:grid-cols-2">
                {[
                  ["Started", formatDate(detail.conversation.started_at)],
                  ["Updated", formatDate(detail.conversation.updated_at)],
                  ["Conversation ID", detail.conversation.id],
                  ["Visitor ID", detail.conversation.visitor_id],
                  ["IP", detail.conversation.visitor_ip || "Unknown"],
                  ["IP Hash", detail.conversation.visitor_ip_hash || "Unknown"],
                  ["Location", [detail.conversation.city, detail.conversation.country_or_region].filter(Boolean).join(", ") || "Unknown"],
                  ["Lead", `${detail.conversation.lead_score}/10 ${detail.conversation.lead_type}`],
                  ["Referrer", detail.conversation.referrer || "None"],
                  ["Page URL", detail.conversation.page_url || "Unknown"],
                  ["UTM", [detail.conversation.utm_source, detail.conversation.utm_medium, detail.conversation.utm_campaign].filter(Boolean).join(" / ") || "None"],
                  ["User Agent", detail.conversation.user_agent || "Unknown"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                    <dt className="p-dim">{label}</dt>
                    <dd className="mt-1 break-words">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 space-y-3">
                <h3 className="font-semibold">Messages</h3>
                {detail.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`rounded-2xl border border-white/10 p-3 ${
                      message.role === "user" ? "bg-brand-accent/10" : "bg-white/5"
                    }`}
                  >
                    <div className="p-dim mb-2 flex items-center justify-between text-xs">
                      <span>{message.role}</span>
                      <span>{formatDate(message.created_at)}</span>
                    </div>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
