import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const ADMIN_COOKIE_NAME = "ali_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

type AdminSession = {
  exp: number;
};

function base64UrlEncode(value: string) {
  return Buffer.from(value, "utf8").toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET ?? "";
}

export function getAdminPasswordHash() {
  return process.env.ADMIN_PASSWORD_HASH ?? "";
}

export function isValidBcryptHash(hash = getAdminPasswordHash()) {
  return /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/.test(hash);
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function isAdminConfigured() {
  return Boolean(getAdminPasswordHash() && getSecret().length >= 32);
}

export function createAdminSessionToken() {
  if (!isAdminConfigured()) {
    throw new Error("Admin auth is not configured.");
  }

  const payload = base64UrlEncode(JSON.stringify({
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  } satisfies AdminSession));

  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSessionToken(token?: string) {
  if (!token || !isAdminConfigured()) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const signatureBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return false;
  }

  try {
    const session = JSON.parse(base64UrlDecode(payload)) as AdminSession;
    return typeof session.exp === "number" && session.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  };
}

export function isAdminRequest(request: NextRequest) {
  return verifyAdminSessionToken(request.cookies.get(ADMIN_COOKIE_NAME)?.value);
}

export function isAdminPageSession() {
  return verifyAdminSessionToken(cookies().get(ADMIN_COOKIE_NAME)?.value);
}
