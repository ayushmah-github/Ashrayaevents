import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export const runtime = "nodejs";

// GET /api/admin/page-content/[key] — fetch one section (admin sees drafts too)
export async function GET(_req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const db = getSupabaseAdmin();
  if (!db) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const { data, error } = await db
    .from("page_content")
    .select("*")
    .eq("section_key", key)
    .maybeSingle();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: data ?? null });
}

// PUT /api/admin/page-content/[key] — upsert one section by its key
export async function PUT(req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const db = getSupabaseAdmin();
  if (!db) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const body = await req.json();
  const { data, error } = await db
    .from("page_content")
    .upsert({ ...body, section_key: key, updated_at: new Date().toISOString() }, { onConflict: "section_key" })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ data });
}
