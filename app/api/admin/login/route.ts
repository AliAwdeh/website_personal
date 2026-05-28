import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createAdminSessionToken,
  getAdminCookieOptions,
  isAdminConfigured,
} from "@/lib/admin/auth";
import { detectVisitorIp } from "@/lib/admin/chat-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_ATTEMPTS = 8;

function rateLimitKey(request: NextRequest) {
  return detectVisitorIp(request) ?? "unknown";
}

function isRateLimited(request: NextRequest) {
  const key = rateLimitKey(request);
  const now = Date.now();
  const current = attempts.get(key);

  if (!current || current.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > MAX_ATTEMPTS;
}

export async function POST(request: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Admin auth is not configured." },
      { status: 500 },
    );
  }

  if (isRateLimited(request)) {
    return NextResponse.json({ error: "Too many login attempts." }, { status: 429 });
  }

  const body = await request.json().catch(() => ({}));
  const password = typeof body.password === "string" ? body.password : "";
  const ok = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH!);

  if (!ok) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, createAdminSessionToken(), getAdminCookieOptions());
  return response;
}
