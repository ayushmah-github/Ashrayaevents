/* ============================================================================
 * About page CMS — dedicated content (page_content, core_values, about_stats).
 * Managed from /admin/about-editor. Falls back to sensible defaults so the
 * page always looks complete before the client edits it.
 * ========================================================================== */
import { cache } from "react";
import { supabasePublic } from "@/lib/supabase/client";
import { values as fbValues, aboutStats as fbStats } from "@/lib/content";

/* eslint-disable @typescript-eslint/no-explicit-any */

export type PageSection = {
  title?: string;
  subtitle?: string;
  bodyMarkdown?: string;
  mediaUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  isPublished: boolean;
};

const EMPTY_SECTION: PageSection = { isPublished: true };

/**
 * Fetch one editable section by key (e.g. "about_hero", "about_story",
 * "about_cta"). Pass `preview: true` (admin-only) to see unpublished drafts.
 */
export const getPageContent = cache(
  async (sectionKey: string, opts?: { preview?: boolean }): Promise<PageSection> => {
    if (!supabasePublic) return EMPTY_SECTION;
    const { data } = await supabasePublic
      .from("page_content")
      .select("*")
      .eq("section_key", sectionKey)
      .maybeSingle();
    if (!data) return EMPTY_SECTION;
    if (!data.is_published && !opts?.preview) return { ...EMPTY_SECTION, isPublished: false };
    return {
      title: data.title || undefined,
      subtitle: data.subtitle || undefined,
      bodyMarkdown: data.body_markdown || undefined,
      mediaUrl: data.media_url || undefined,
      seoTitle: data.seo_title || undefined,
      seoDescription: data.seo_description || undefined,
      isPublished: data.is_published !== false,
    };
  },
);

export type CoreValue = { icon?: string; title: string; description: string };
export const getCoreValues = cache(async (): Promise<CoreValue[]> => {
  if (!supabasePublic) return fbValues;
  const { data } = await supabasePublic
    .from("core_values")
    .select("*")
    .order("sort_order", { ascending: true });
  if (!data || !data.length) return fbValues;
  return data.map((r: any) => ({
    icon: r.icon || undefined,
    title: r.title,
    description: r.description ?? "",
  }));
});

export type AboutStat = { label: string; value: string; prefixSuffix?: string };
export const getAboutStats = cache(async (): Promise<AboutStat[]> => {
  if (!supabasePublic) return fbStats;
  const { data } = await supabasePublic
    .from("about_stats")
    .select("*")
    .order("sort_order", { ascending: true });
  if (!data || !data.length) return fbStats;
  return data.map((r: any) => ({
    label: r.label,
    value: r.value,
    prefixSuffix: r.prefix_suffix || undefined,
  }));
});
