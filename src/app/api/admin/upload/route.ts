import { NextResponse } from "next/server";
import { getSupabaseAdmin, MEDIA_BUCKET } from "@/lib/supabase/client";

export const runtime = "nodejs";

// POST /api/admin/upload — multipart file → Supabase Storage → { url }
export async function POST(req: Request) {
  const db = getSupabaseAdmin();
  if (!db) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${Date.now()}-${safeName}`;

  const { error } = await db.storage.from(MEDIA_BUCKET).upload(path, file, {
    contentType: file.type || "application/octet-stream",
    upsert: false,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const { data } = db.storage.from(MEDIA_BUCKET).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
