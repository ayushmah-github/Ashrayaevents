import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { isValidTable } from "@/lib/admin/resources";

export const runtime = "nodejs";

// GET /api/admin/[table] — list all rows
export async function GET(_req: Request, { params }: { params: Promise<{ table: string }> }) {
  const { table } = await params;
  if (!isValidTable(table)) return NextResponse.json({ error: "Unknown table" }, { status: 404 });
  const db = getSupabaseAdmin();
  if (!db) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const orderCol = table === "posts" ? "published_at" : "sort_order";
  const { data, error } = await db.from(table).select("*").order(orderCol, { ascending: table !== "posts" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

// POST /api/admin/[table] — create a row
export async function POST(req: Request, { params }: { params: Promise<{ table: string }> }) {
  const { table } = await params;
  if (!isValidTable(table)) return NextResponse.json({ error: "Unknown table" }, { status: 404 });
  const db = getSupabaseAdmin();
  if (!db) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const body = await req.json();
  const { data, error } = await db.from(table).insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}
