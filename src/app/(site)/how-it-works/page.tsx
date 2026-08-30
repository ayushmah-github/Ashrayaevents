import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ProcessJourney from "@/components/sections/ProcessJourney";
import RoleCards from "@/components/sections/RoleCards";
import InquiryDrawer from "@/components/shared/InquiryDrawer";
import { getPageBanner } from "@/lib/cms/home";
import { getPageContent } from "@/lib/cms/about";
import { getJourneySteps, getRoleCards } from "@/lib/cms/how-it-works";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How Ashraya Events plans your celebration — from first conversation to flawless execution.",
};

export default async function HowItWorksPage() {
  const [banner, hero, steps, roles] = await Promise.all([
    getPageBanner("How It Works"),
    getPageContent("how_it_works_hero"),
    getJourneySteps(),
    getRoleCards(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Our process"
        title={banner?.title || "How It Works"}
        intro={banner?.subtitle || "A calm, transparent journey — from your first hello to the last farewell."}
        image={banner?.image}
      />

      {/* Journey headline + CTA */}
      {hero.isPublished && (
        <Section tone="cream" className="pb-0 pt-16 sm:pt-20">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl text-maroon sm:text-5xl text-balance">
              {hero.title || "Your Celebration, in Four Simple Steps"}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
              {hero.subtitle ||
                "From your first conversation with us to your final celebration, here's exactly how we bring your vision to life."}
            </p>
            <div className="mt-8">
              <InquiryDrawer
                triggerLabel="Start Planning Your Celebration"
                triggerClassName="inline-flex items-center gap-2 rounded-full bg-maroon px-8 py-3.5 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5 hover:bg-maroon-dark"
              />
            </div>
          </Reveal>
        </Section>
      )}

      {/* The 4-step journey */}
      <Section tone="cream">
        <ProcessJourney steps={steps} />
      </Section>

      {/* Meet Your Team */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Who you'll work with"
          title="Meet Your Team"
          intro="The people who bring your celebration to life."
        />
        <RoleCards roles={roles} />
      </Section>
    </>
  );
}
