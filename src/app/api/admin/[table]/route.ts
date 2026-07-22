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

  // site_settings is a singleton (no sort_order); posts sort by date desc.
  let query = db.from(table).select("*");
  if (table === "posts") {
    query = query.order("published_at", { ascending: false });
  } else if (table !== "site_settings") {
    query = query.order("sort_order", { ascending: true });
  }
  const { data, error } = await query;
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
