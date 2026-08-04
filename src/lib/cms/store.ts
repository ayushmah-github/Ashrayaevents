/* ============================================================================
 * Decorations store — data fetchers (Supabase, with fallback to placeholders).
 * ========================================================================== */
import { cache } from "react";
import { supabasePublic } from "@/lib/supabase/client";
import {
  DECORATION_CATEGORIES,
  FALLBACK_CITIES,
  FALLBACK_DECORATIONS,
  type Decoration,
  type DecorationCategory,
  type City,
} from "@/lib/store-data";

/* eslint-disable @typescript-eslint/no-explicit-any */
function mapDecoration(r: any): Decoration {
  return {
    id: r.id,
    title: r.title,
    slug: r.slug,
    category: r.category ?? "",
    city: r.city ?? "",
    area: r.area ?? undefined,
    price: r.price ?? 0,
    discount: r.discount ?? 0,
    theme: r.theme ?? undefined,
    description: r.description ?? undefined,
    includedItems: r.included_items ?? [],
    addons: r.addons ?? [],
    images: r.images ?? [],
    faqs: r.faqs ?? [],
    rating: r.rating ?? 0,
    availability: r.availability ?? true,
    featured: r.featured ?? false,
  };
}

export type DecorationFilters = {
  city?: string;
  category?: string;
  theme?: string;
  q?: string;
  maxBudget?: number;
  featured?: boolean;
};

async function allDecorations(): Promise<Decoration[]> {
  if (!supabasePublic) return FALLBACK_DECORATIONS;
  const { data, error } = await supabasePublic
    .from("decorations")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error || !data || !data.length) return FALLBACK_DECORATIONS;
  return data.map(mapDecoration);
}

export const getDecorations = cache(
  async (filters: DecorationFilters = {}): Promise<Decoration[]> => {
    let list = await allDecorations();
    const { city, category, theme, q, maxBudget, featured } = filters;
    if (featured) list = list.filter((d) => d.featured);
    if (city) list = list.filter((d) => d.city.toLowerCase() === city.toLowerCase());
    if (category)
      list = list.filter(
        (d) => d.category.toLowerCase() === category.toLowerCase(),
      );
    if (theme) list = list.filter((d) => (d.theme || "").toLowerCase().includes(theme.toLowerCase()));
    if (maxBudget) list = list.filter((d) => d.price <= maxBudget);
    if (q) {
      const needle = q.toLowerCase();
      list = list.filter(
        (d) =>
          d.title.toLowerCase().includes(needle) ||
          d.category.toLowerCase().includes(needle) ||
          (d.theme || "").toLowerCase().includes(needle) ||
          d.city.toLowerCase().includes(needle),
      );
    }
    return list;
  },
);

export const getDecoration = cache(async (slug: string): Promise<Decoration | null> => {
  if (!supabasePublic) return FALLBACK_DECORATIONS.find((d) => d.slug === slug) ?? null;
  const { data } = await supabasePublic.from("decorations").select("*").eq("slug", slug).maybeSingle();
  if (!data) return FALLBACK_DECORATIONS.find((d) => d.slug === slug) ?? null;
  return mapDecoration(data);
});

export const getDecorationCategories = cache(async (): Promise<DecorationCategory[]> => {
  if (!supabasePublic) return DECORATION_CATEGORIES;
  const { data } = await supabasePublic
    .from("decoration_categories")
    .select("*")
    .order("sort_order", { ascending: true });
  if (!data || !data.length) return DECORATION_CATEGORIES;
  return data.map((r: any) => ({ name: r.name, slug: r.slug, image: r.image ?? undefined }));
});

export const getCities = cache(async (): Promise<City[]> => {
  if (!supabasePublic) return FALLBACK_CITIES;
  const { data } = await supabasePublic
    .from("cities")
    .select("*")
    .order("sort_order", { ascending: true });
  if (!data || !data.length) return FALLBACK_CITIES;
  return data.map((r: any) => ({ name: r.name, slug: r.slug, image: r.image ?? undefined }));
});
