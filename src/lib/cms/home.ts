/* ============================================================================
 * Home-page managed sections — fetchers (Supabase, with fallback to content.ts).
 * ========================================================================== */
import { cache } from "react";
import { supabasePublic } from "@/lib/supabase/client";
import {
  weddingCategories as fbCategories,
  capabilities as fbTiles,
  inspirationTabs as fbInspiration,
  team as fbTeam,
  awards as fbAwards,
  processSteps as fbSteps,
  type WeddingCategory,
  type Capability,
  type InspirationTab,
  type Award,
  type ProcessStep,
} from "@/lib/content";

/* eslint-disable @typescript-eslint/no-explicit-any */
async function rows(table: string): Promise<any[] | null> {
  if (!supabasePublic) return null;
  const { data, error } = await supabasePublic
    .from(table)
    .select("*")
    .order("sort_order", { ascending: true });
  if (error || !data) return null;
  return data;
}

export const getHomeCategories = cache(async (): Promise<WeddingCategory[]> => {
  const data = await rows("home_categories");
  if (!data || !data.length) return fbCategories;
  return data.map((r) => ({
    title: r.title,
    description: r.description ?? "",
    image: r.image ?? "",
    tint: r.tint || "#F2E9DC",
  }));
});

export const getServiceTiles = cache(async (): Promise<Capability[]> => {
  const data = await rows("service_tiles");
  if (!data || !data.length) return fbTiles;
  return data.map((r) => ({ title: r.title, image: r.image ?? "" }));
});

export type TeamMember = { name: string; role: string; bio: string; image: string };
export const getTeam = cache(async (): Promise<TeamMember[]> => {
  const data = await rows("team_members");
  if (!data || !data.length) return fbTeam as TeamMember[];
  return data.map((r) => ({
    name: r.name,
    role: r.role ?? "",
    bio: r.bio ?? "",
    image: r.image ?? "",
  }));
});

export const getAwards = cache(async (): Promise<Award[]> => {
  const data = await rows("awards");
  if (!data || !data.length) return fbAwards;
  return data.map((r) => ({ name: r.name, image: r.image ?? undefined }));
});

export type PageBanner = { image?: string; title?: string; subtitle?: string };
/** Per-page banner (top header image + optional title/subtitle override). */
export const getPageBanner = cache(async (page: string): Promise<PageBanner | null> => {
  if (!supabasePublic) return null;
  const { data } = await supabasePublic
    .from("page_banners")
    .select("*")
    .eq("page", page)
    .order("sort_order", { ascending: true })
    .limit(1)
    .maybeSingle();
  if (!data) return null;
  return {
    image: data.image || undefined,
    title: data.title || undefined,
    subtitle: data.subtitle || undefined,
  };
});

export const getProcessSteps = cache(async (): Promise<ProcessStep[]> => {
  const data = await rows("process_steps");
  if (!data || !data.length) return fbSteps;
  return data.map((r, i) => ({
    step: r.step || String(i + 1).padStart(2, "0"),
    title: r.title,
    description: r.description ?? "",
  }));
});

/** Inspiration frames grouped into tabs (Haldi/Mehndi/…). */
export const getInspiration = cache(async (): Promise<InspirationTab[]> => {
  const data = await rows("inspiration_frames");
  if (!data || !data.length) return fbInspiration;
  const order = ["Haldi", "Mehndi", "Sangeet", "Wedding", "Reception"];
  const byTab = new Map<string, { title: string; image: string }[]>();
  for (const r of data) {
    const tab = r.tab || "Wedding";
    if (!byTab.has(tab)) byTab.set(tab, []);
    byTab.get(tab)!.push({ title: r.title, image: r.image ?? "" });
  }
  const rank = (t: string) => (order.indexOf(t) === -1 ? 999 : order.indexOf(t));
  const tabs = [...byTab.keys()].sort((a, b) => rank(a) - rank(b));
  return tabs.map((label) => ({ label, frames: byTab.get(label)! }));
});
