/* ============================================================================
 * Supabase clients
 * ----------------------------------------------------------------------------
 * - supabasePublic: anon key, used for public reads (RLS allows SELECT).
 * - getSupabaseAdmin(): service-role key, SERVER ONLY, used by /api/admin for
 *   writes and media uploads. Never import the admin client into client code.
 *
 * Both return null when the env vars aren't set, so the site keeps working with
 * built-in placeholder content until Supabase is connected.
 * ========================================================================== */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabasePublic: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url, anonKey, { auth: { persistSession: false } })
  : null;

/** Server-only admin client (service role). Returns null if not configured. */
export function getSupabaseAdmin(): SupabaseClient | null {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey, { auth: { persistSession: false } });
}

/** Storage bucket used for uploaded media. */
export const MEDIA_BUCKET = "media";
