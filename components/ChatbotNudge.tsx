"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, MessageCircle, X } from "lucide-react";

const DISMISSED_KEY = "ali_chatbot_nudge_dismissed";
const WHATSAPP_CHATBOT_URL = "https://wa.me/96171056438";

export function ChatbotNudge() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem(DISMISSED_KEY) === "true") return;

    const timer = window.setTimeout(() => setIsVisible(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const dismiss = () => {
    window.sessionStorage.setItem(DISMISSED_KEY, "true");
    setIsVisible(false);
  };

  return (
    <div className="fixed bottom-24 right-4 z-[70] w-[calc(100vw-2rem)] max-w-sm sm:bottom-28 sm:right-6">
      <div className="relative rounded-3xl border border-brand-accent/50 bg-brand-card/95 p-4 shadow-glow backdrop-blur">
        <button
          type="button"
          aria-label="Dismiss chatbot prompt"
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-brand-dim hover:bg-white/10"
          onClick={dismiss}
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex gap-3 pr-8">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-brand-accent bg-brand-accent/15">
            <MessageCircle className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Try Ali's WhatsApp chatbot</p>
            <p className="mt-1 text-sm leading-relaxed text-brand-dim">
              Ask about AI chatbots, machine learning, backend automation, projects, or hiring.
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <a
            href={WHATSAPP_CHATBOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-accent min-h-10 flex-1 rounded-2xl text-sm"
            onClick={dismiss}
          >
            Open WhatsApp Chatbot
          </a>
          <ArrowDownRight className="h-7 w-7 shrink-0 text-brand-accent2" aria-hidden="true" />
        </div>

        <div className="absolute -bottom-2 right-8 h-4 w-4 rotate-45 border-b border-r border-brand-accent/50 bg-brand-card/95" />
      </div>
    </div>
  );
}
