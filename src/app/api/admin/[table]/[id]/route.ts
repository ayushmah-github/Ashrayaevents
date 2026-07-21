import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { isValidTable } from "@/lib/admin/resources";

export const runtime = "nodejs";

// PATCH /api/admin/[table]/[id] — update a row
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ table: string; id: string }> },
) {
  const { table, id } = await params;
  if (!isValidTable(table)) return NextResponse.json({ error: "Unknown table" }, { status: 404 });
  const db = getSupabaseAdmin();
  if (!db) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const body = await req.json();
  const idValue = table === "site_settings" ? Number(id) : id;
  const { data, error } = await db.from(table).update(body).eq("id", idValue).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}

// DELETE /api/admin/[table]/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ table: string; id: string }> },
) {
  const { table, id } = await params;
  if (!isValidTable(table)) return NextResponse.json({ error: "Unknown table" }, { status: 404 });
  const db = getSupabaseAdmin();
  if (!db) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const { error } = await db.from(table).delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
