/* ============================================================================
 * "How It Works" page CMS — the 4-step journey and team-role cards.
 * Managed from /admin/how-it-works-editor.
 * ========================================================================== */
import { cache } from "react";
import { supabasePublic } from "@/lib/supabase/client";
import {
  processPhases as fbPhases,
  roleCards as fbRoles,
  type ProcessPhase,
  type RoleCard,
} from "@/lib/content";

/* eslint-disable @typescript-eslint/no-explicit-any */

export type Step = {
  stepNumber: number;
  stepTitle: string;
  phases: { title: string; description: string; ctaLabel?: string }[];
};

/** Phases grouped into numbered steps, in the order they appear. */
export const getJourneySteps = cache(async (): Promise<Step[]> => {
  let phases: ProcessPhase[] = fbPhases;
  if (supabasePublic) {
    const { data } = await supabasePublic
      .from("process_phases")
      .select("*")
      .order("sort_order", { ascending: true });
    if (data && data.length) {
      phases = data.map((r: any) => ({
        stepNumber: r.step_number,
        stepTitle: r.step_title,
        phaseTitle: r.phase_title,
        phaseDescription: r.phase_description ?? "",
        ctaLabel: r.cta_label || undefined,
      }));
    }
  }

  const byStep = new Map<number, Step>();
  for (const p of phases) {
    if (!byStep.has(p.stepNumber)) {
      byStep.set(p.stepNumber, { stepNumber: p.stepNumber, stepTitle: p.stepTitle, phases: [] });
    }
    byStep.get(p.stepNumber)!.phases.push({
      title: p.phaseTitle,
      description: p.phaseDescription,
      ctaLabel: p.ctaLabel,
    });
  }
  return [...byStep.values()].sort((a, b) => a.stepNumber - b.stepNumber);
});

export const getRoleCards = cache(async (): Promise<RoleCard[]> => {
  if (!supabasePublic) return fbRoles;
  const { data } = await supabasePublic
    .from("role_cards")
    .select("*")
    .order("sort_order", { ascending: true });
  if (!data || !data.length) return fbRoles;
  return data.map((r: any) => ({ title: r.title, description: r.description ?? "" }));
});
