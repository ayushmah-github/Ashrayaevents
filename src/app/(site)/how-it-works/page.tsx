import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Breadcrumb from "@/components/shared/Breadcrumb";
import CtaAction from "@/components/shared/CtaAction";
import StepNavigator from "@/components/sections/StepNavigator";
import StepSection from "@/components/sections/StepSection";
import RoleCards from "@/components/sections/RoleCards";
import { getPageBanner } from "@/lib/cms/home";
import { getPageContent } from "@/lib/cms/about";
import { getHowItWorksSteps, getHowItWorksTeamRoles } from "@/lib/cms/how-it-works";

const DEFAULT_DESCRIPTION =
  "How Ashraya Events plans your celebration — from first conversation to flawless execution.";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const hero = await getPageContent("how_it_works_hero");
  return {
    title: hero.seoTitle || "How It Works",
    description: hero.seoDescription || DEFAULT_DESCRIPTION,
  };
}

export default async function HowItWorksPage() {
  const [banner, hero, intro, team, steps, roles] = await Promise.all([
    getPageBanner("How It Works"),
    getPageContent("how_it_works_hero"),
    getPageContent("how_it_works_intro"),
    getPageContent("how_it_works_team"),
    getHowItWorksSteps(),
    getHowItWorksTeamRoles(),
  ]);

  // The hero's publish toggle gates the whole page (matches the reference's
  // "unpublished page returns 404" behaviour); other sections below have
  // their own independent Published/Draft switches.
  if (!hero.isPublished) notFound();

  return (
    <>
      <PageHeader
        eyebrow="Our process"
        title={hero.title || banner?.title || "How it works"}
        intro={hero.subtitle || banner?.subtitle}
        image={hero.mediaUrl || banner?.image}
      />

      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "How it works" }]}
      />

      {/* Intro: H1 + subtitle with a vertical gold accent bar, primary CTA, step navigator */}
      {intro.isPublished && (
        <Section tone="cream" className="text-center">
          <Reveal className="mx-auto max-w-2xl">
            <div className="inline-flex items-start gap-4 text-left">
              <span className="mt-1 h-full w-1 flex-none rounded-full bg-gold" aria-hidden />
              <h1 className="text-4xl text-maroon sm:text-5xl text-balance">
                {intro.title || "Your Dream Wedding in 4 Simple Steps"}
              </h1>
            </div>
            <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
              {intro.subtitle ||
                "From your first consultation to your final celebration, here's how we bring your vision to life."}
            </p>
          </Reveal>

          <StepNavigator steps={steps} />

          <div className="mt-8">
            <CtaAction
              label={intro.ctaLabel || "Start Planning Your Dream Wedding"}
              url={intro.ctaUrl}
              className="inline-flex items-center gap-2 rounded-full bg-maroon px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-cream transition-transform hover:-translate-y-0.5 hover:bg-maroon-dark"
            />
          </div>
        </Section>
      )}

      {/* The 4 steps, linear — anchored for the navigator above */}
      <Section tone="cream" className="space-y-24 pt-0">
        {steps.map((step, i) => (
          <StepSection key={step.slug} step={step} index={i} />
        ))}
      </Section>

      {/* Meet Your Team */}
      {team.isPublished && (
        <Section tone="sand">
          <SectionHeading
            eyebrow="Who you'll work with"
            title={team.title || "Meet Your Team"}
            intro={team.subtitle || "The experts who bring your dream wedding to life."}
          />
          <RoleCards roles={roles} />
        </Section>
      )}
    </>
  );
}
