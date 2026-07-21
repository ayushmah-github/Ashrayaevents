/* ============================================================================
 * CMS data layer — reads from Supabase (managed via /admin), with automatic
 * fallback to the built-in placeholder data in src/lib/content.ts.
 * Every managed component imports these instead of the static arrays.
 * ========================================================================== */
import { cache } from "react";
import { supabasePublic } from "@/lib/supabase/client";
import {
  services as fallbackServices,
  portfolio as fallbackPortfolio,
  testimonials as fallbackTestimonials,
  stats as fallbackStats,
  type Service,
  type PortfolioItem,
  type Testimonial,
} from "@/lib/content";
import { faqs as fallbackFaqs } from "@/lib/ai/knowledge";

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  coverImage?: string;
  publishedAt: string;
  author?: string;
  body?: string; // Markdown
};

export type SiteSettings = {
  tagline?: string;
  heroImages?: string[];
  storyTitle?: string;
  storyBody?: string;
  stats?: { value: string; label: string }[];
};

// [PLACEHOLDER] blog posts shown until the client publishes real ones.
const FALLBACK_POSTS: Post[] = [
  {
    id: "ph1",
    title: "5 Questions to Ask Before Booking a Wedding Venue",
    slug: "questions-before-booking-venue",
    excerpt:
      "The right venue sets the tone for everything. Here's what to nail down before you sign — from guest capacity to hidden costs.",
    category: "Weddings",
    coverImage:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=70&auto=format&fit=crop",
    publishedAt: "2026-05-02",
    author: "Ashraya Events",
  },
  {
    id: "ph2",
    title: "Planning a Destination Wedding Without the Stress",
    slug: "destination-wedding-without-stress",
    excerpt:
      "Dreaming of vows by the sea or in a palace courtyard? Our step-by-step guide to a seamless destination celebration.",
    category: "Destination",
    coverImage:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=70&auto=format&fit=crop",
    publishedAt: "2026-04-18",
    author: "Ashraya Events",
  },
  {
    id: "ph3",
    title: "Décor Trends We're Loving This Season",
    slug: "decor-trends-this-season",
    excerpt:
      "From sculptural florals to warm candlelit tablescapes — the details making celebrations feel personal and unforgettable.",
    category: "Décor",
    coverImage:
      "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=1200&q=70&auto=format&fit=crop",
    publishedAt: "2026-03-30",
    author: "Ashraya Events",
  },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
async function selectAll(table: string, order = "sort_order", asc = true): Promise<any[] | null> {
  if (!supabasePublic) return null;
  const { data, error } = await supabasePublic.from(table).select("*").order(order, { ascending: asc });
  if (error || !data) return null;
  return data;
}

export const getServices = cache(async (): Promise<Service[]> => {
  const rows = await selectAll("services");
  if (!rows || !rows.length) return fallbackServices;
  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    short: r.short ?? "",
    description: r.description ?? "",
    image: r.image ?? "",
    features: r.features ?? [],
  }));
});

export const getPortfolio = cache(async (): Promise<PortfolioItem[]> => {
  const rows = await selectAll("portfolio_items");
  if (!rows || !rows.length) return fallbackPortfolio;
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    category: r.category,
    location: r.location ?? "",
    image: r.image ?? "",
  }));
});

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const rows = await selectAll("testimonials");
  if (!rows || !rows.length) return fallbackTestimonials;
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    event: r.event ?? "",
    location: r.location ?? "",
    rating: r.rating ?? 5,
    quote: r.quote,
  }));
});

export const getFaqs = cache(async (): Promise<{ q: string; a: string }[]> => {
  const rows = await selectAll("faqs");
  if (!rows || !rows.length) return fallbackFaqs;
  return rows.map((r) => ({ q: r.question, a: r.answer }));
});

export const getPosts = cache(async (): Promise<Post[]> => {
  const rows = await selectAll("posts", "published_at", false);
  if (!rows || !rows.length) return FALLBACK_POSTS;
  return rows.map(mapPost);
});

export const getPost = cache(async (slug: string): Promise<Post | null> => {
  if (!supabasePublic) return FALLBACK_POSTS.find((p) => p.slug === slug) ?? null;
  const { data } = await supabasePublic.from("posts").select("*").eq("slug", slug).maybeSingle();
  if (!data) return FALLBACK_POSTS.find((p) => p.slug === slug) ?? null;
  return mapPost(data);
});

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  let row: any = null;
  if (supabasePublic) {
    const { data } = await supabasePublic.from("site_settings").select("*").eq("id", 1).maybeSingle();
    row = data;
  }
  return {
    tagline: row?.tagline || undefined,
    heroImages: row?.hero_images?.length ? row.hero_images : undefined,
    storyTitle: row?.story_title || undefined,
    storyBody: row?.story_body || undefined,
    stats: row?.stats?.length ? row.stats : fallbackStats,
  };
});

function mapPost(r: any): Post {
  return {
    id: r.id,
    title: r.title,
    slug: r.slug,
    excerpt: r.excerpt ?? "",
    category: r.category ?? undefined,
    coverImage: r.cover_image ?? undefined,
    publishedAt: r.published_at ?? r.created_at ?? new Date().toISOString(),
    author: r.author ?? undefined,
    body: r.body ?? undefined,
  };
}
