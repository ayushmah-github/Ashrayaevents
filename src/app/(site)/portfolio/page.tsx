import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import PortfolioGallery from "@/components/portfolio/PortfolioGallery";
import YouTubeFilms from "@/components/sections/YouTubeFilms";
import CTASection from "@/components/sections/CTASection";
import { getPortfolio } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore Ashraya Events' portfolio of weddings, destination celebrations, corporate events and parties.",
};

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const portfolio = await getPortfolio();
  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Portfolio"
        intro="A curated look at the celebrations we've designed and delivered. Filter by event type and tap any image to view."
      />

      <Section tone="cream">
        {/* Portfolio items come from the /studio admin (with placeholder fallback) */}
        <PortfolioGallery portfolio={portfolio} />
      </Section>

      <Section tone="sand">
        <SectionHeading
          eyebrow="Event films"
          title="Our celebrations, in motion"
          intro="A selection of highlight films from recent events."
        />
        <YouTubeFilms />
      </Section>

      <CTASection title="Imagine your event here." />
    </>
  );
}
