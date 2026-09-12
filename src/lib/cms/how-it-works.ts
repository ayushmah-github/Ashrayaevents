/* ============================================================================
 * "How It Works" page CMS — the 4-step journey (steps + nested content items)
 * and team-role cards. Managed from /admin/how-it-works-editor.
 * ========================================================================== */
import { cache } from "react";
import { supabasePublic } from "@/lib/supabase/client";
import {
  howItWorksSteps as fbSteps,
  howItWorksTeamRoles as fbRoles,
  type HowItWorksStep,
  type HowItWorksTeamRole,
} from "@/lib/content";

/* eslint-disable @typescript-eslint/no-explicit-any */

/** Steps with their active content items nested, in display order. */
export const getHowItWorksSteps = cache(async (): Promise<HowItWorksStep[]> => {
  if (!supabasePublic) return fbSteps;

  const { data: steps } = await supabasePublic
    .from("how_it_works_steps")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (!steps || !steps.length) return fbSteps;

  const { data: items } = await supabasePublic
    .from("how_it_works_step_items")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  return steps.map((s: any) => ({
    title: s.title,
    slug: s.slug,
    navLabel: s.nav_label || undefined,
    icon: s.icon || undefined,
    pullQuote: s.pull_quote || undefined,
    items: (items || [])
      .filter((i: any) => i.step_id === s.id)
      .map((i: any) => ({
        heading: i.heading,
        body: i.body ?? "",
        image: i.image || undefined,
        ctaLabel: i.cta_label || undefined,
        ctaUrl: i.cta_url || undefined,
      })),
  }));
});

export const getHowItWorksTeamRoles = cache(async (): Promise<HowItWorksTeamRole[]> => {
  if (!supabasePublic) return fbRoles;
  const { data } = await supabasePublic
    .from("how_it_works_team_roles")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });
  if (!data || !data.length) return fbRoles;
  return data.map((r: any) => ({
    title: r.title,
    description: r.description ?? "",
    icon: r.icon || undefined,
    image: r.image || undefined,
  }));
});
