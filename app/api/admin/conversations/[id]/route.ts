import { NextRequest, NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin/auth";
import {
  deleteConversation,
  getConversation,
  patchConversation,
} from "@/lib/admin/chat-log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = {
  params: { id: string };
};

export async function GET(request: NextRequest, { params }: Params) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = getConversation(params.id);
  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(result);
}

export async function PATCH(request: NextRequest, { params }: Params) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const ok = patchConversation(params.id, {
    reviewed: typeof body.reviewed === "boolean" ? body.reviewed : undefined,
    archived: typeof body.archived === "boolean" ? body.archived : undefined,
  });

  if (!ok) {
    return NextResponse.json({ error: "Not found or unchanged" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest, { params }: Params) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const ok = deleteConversation(params.id);
  if (!ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
