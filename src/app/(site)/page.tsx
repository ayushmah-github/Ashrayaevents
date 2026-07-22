import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Hero from "@/components/sections/Hero";
import IntroFeature from "@/components/sections/IntroFeature";
import CollageMosaic from "@/components/sections/CollageMosaic";
import AwardsStrip from "@/components/sections/AwardsStrip";
import WeddingCategories from "@/components/sections/WeddingCategories";
import ServicesTiles from "@/components/sections/ServicesTiles";
import VideoShowcase from "@/components/sections/VideoShowcase";
import WeddingStories from "@/components/sections/WeddingStories";
import InspirationGallery from "@/components/sections/InspirationGallery";
import TestimonialVideos from "@/components/sections/TestimonialVideos";
import InstagramStrip from "@/components/sections/InstagramStrip";
import CompanyDetails from "@/components/sections/CompanyDetails";
import CTASection from "@/components/sections/CTASection";
import { getSiteSettings } from "@/lib/cms/content";

export default async function HomePage() {
  const settings = await getSiteSettings();
  return (
    <>
      {/* 1 — Hero (full-screen video / photo) */}
      <Hero images={settings.heroImages} />

      {/* 2 — Royal elegance intro */}
      <IntroFeature />

      {/* 3 — Photo collage */}
      <CollageMosaic />

      {/* 4 — As seen in / awards */}
      <AwardsStrip />

      {/* 5 — Wedding categories */}
      <WeddingCategories />

      {/* 6 — Services we provide */}
      <ServicesTiles />

      {/* 7 — Signature film band */}
      <VideoShowcase />

      {/* 8 — Our work / wedding stories */}
      <WeddingStories />

      {/* 9 — Inspiration for wedding frames */}
      <InspirationGallery />

      {/* 10 — Journey + video testimonials */}
      <TestimonialVideos />

      {/* 11 — Instagram */}
      <Section tone="sand">
        <SectionHeading eyebrow="Follow along" title="Follow us on Instagram" />
        <InstagramStrip />
      </Section>

      {/* 12 — Company details + map */}
      <Section tone="cream">
        <CompanyDetails />
      </Section>

      <CTASection />
    </>
  );
}
