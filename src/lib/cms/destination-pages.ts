/* ============================================================================
 * Destination / city landing pages (e.g. /wedding-planner-in-delhi-ncr).
 * One `destination_pages` row per city, with `destination_page_blocks` and
 * `destination_page_faqs` nested beneath it. Managed from
 * /admin/destination-pages-editor. Falls back to the seeded page in
 * content.ts so the template always renders before the client adds content.
 * ========================================================================== */
import { cache } from "react";
import { supabasePublic } from "@/lib/supabase/client";
import {
  destinationPages as fbPages,
  type DestinationPage,
  type DestinationBlock,
  type DestinationFaq,
} from "@/lib/content";

/* eslint-disable @typescript-eslint/no-explicit-any */

export type { DestinationPage, DestinationBlock, DestinationFaq };

function mapPage(row: any, blocks: any[], faqs: any[]): DestinationPage {
  return {
    slug: row.slug,
    city: row.city,
    region: row.region === "International" ? "International" : "Domestic",
    heroTitle: row.hero_title || undefined,
    heroBody: row.hero_body || undefined,
    heroImage: row.hero_image || undefined,
    galleryImages: row.gallery_images?.length ? row.gallery_images : undefined,
    officeName: row.office_name || undefined,
    officeAddress: row.office_address || undefined,
    officePhone: row.office_phone || undefined,
    seoTitle: row.seo_title || undefined,
    seoDescription: row.seo_description || undefined,
    blocks: blocks.map((b) => ({
      heading: b.heading || undefined,
      body: b.body || undefined,
      bullets: b.bullets || undefined,
      image: b.image || undefined,
      layout: b.layout || "text",
    })),
    faqs: faqs.map((f) => ({ question: f.question, answer: f.answer ?? "" })),
  };
}

/** Every published city page — used for the footer links and static params. */
export const getDestinationPages = cache(async (): Promise<DestinationPage[]> => {
  if (!supabasePublic) return fbPages;
  const { data } = await supabasePublic
    .from("destination_pages")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  if (!data || !data.length) return fbPages;
  // Listing only needs the page-level fields — blocks/FAQs are fetched per page.
  return data.map((row: any) => mapPage(row, [], []));
});

/** One city page by slug, with its content blocks and FAQs nested. */
export const getDestinationPage = cache(async (slug: string): Promise<DestinationPage | null> => {
  if (!supabasePublic) return fbPages.find((p) => p.slug === slug) ?? null;

  const { data: row } = await supabasePublic
    .from("destination_pages")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (!row) return fbPages.find((p) => p.slug === slug) ?? null;

  const [{ data: blocks }, { data: faqs }] = await Promise.all([
    supabasePublic
      .from("destination_page_blocks")
      .select("*")
      .eq("page_id", row.id)
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabasePublic
      .from("destination_page_faqs")
      .select("*")
      .eq("page_id", row.id)
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
  ]);

  return mapPage(row, blocks ?? [], faqs ?? []);
});
