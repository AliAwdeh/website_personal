"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const VISITOR_ID_KEY = "ali_chat_visitor_id";
const CONVERSATION_ID_KEY = "ali_chat_conversation_id";

function getStoredId(key: string, prefix: string) {
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;

  const id = `${prefix}_${crypto.randomUUID()}`;
  window.localStorage.setItem(key, id);
  return id;
}

export function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const visitorId = getStoredId(VISITOR_ID_KEY, "visitor");
    const conversationId = window.localStorage.getItem(CONVERSATION_ID_KEY);

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        visitor_id: visitorId,
        conversation_id: conversationId,
        page_url: window.location.href,
        referrer: document.referrer,
      }),
    })
      .then(async (response) => {
        if (!response.ok) return;
        const data = await response.json().catch(() => null);
        if (typeof data?.visitor_id === "string") {
          window.localStorage.setItem(VISITOR_ID_KEY, data.visitor_id);
        }
        if (typeof data?.conversation_id === "string") {
          window.localStorage.setItem(CONVERSATION_ID_KEY, data.conversation_id);
        }
      })
      .catch((error) => {
        console.error("Visitor tracking failed.", error);
      });
  }, [pathname]);

  return null;
}
