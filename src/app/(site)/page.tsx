import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Hero from "@/components/sections/Hero";
import AwardsStrip from "@/components/sections/AwardsStrip";
import IntroBand from "@/components/sections/IntroBand";
import AboutTeaser from "@/components/sections/AboutTeaser";
import StatsBar from "@/components/sections/StatsBar";
import ServicesGrid from "@/components/sections/ServicesGrid";
import GalleryPreview from "@/components/sections/GalleryPreview";
import VideoShowcase from "@/components/sections/VideoShowcase";
import FAQAccordion from "@/components/sections/FAQAccordion";
import GoogleReviews from "@/components/sections/GoogleReviews";
import InstagramStrip from "@/components/sections/InstagramStrip";
import LatestPosts from "@/components/sections/LatestPosts";
import CompanyDetails from "@/components/sections/CompanyDetails";
import { getSiteSettings, getFaqs } from "@/lib/cms/content";

export default async function HomePage() {
  const [settings, faqs] = await Promise.all([getSiteSettings(), getFaqs()]);
  return (
    <>
      {/* 1 — Hero (grand, royal-elegance) */}
      <Hero images={settings.heroImages} />

      {/* As seen in / press */}
      <AwardsStrip />

      {/* Intro statement + CTAs (value prop under the clean hero) */}
      <IntroBand />

      {/* 2 — Our Story (storytelling) */}
      <Section tone="cream">
        <AboutTeaser />
      </Section>

      <Section tone="sand" className="py-16 sm:py-20">
        <StatsBar />
      </Section>

      {/* 3 — What we do (services) */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="What we do"
          title="Every kind of celebration"
          intro="From weddings to corporate galas, we design and deliver experiences your guests will remember."
        />
        <ServicesGrid />
        <div className="mt-12 text-center">
          <Button href="/services" variant="primary">
            View all services
          </Button>
        </div>
      </Section>

      {/* 4 — Stories (portfolio) */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Our work"
          title="Stories we've crafted"
          intro="Every celebration is a story. Here are a few of our favourites."
        />
        <GalleryPreview />
        <div className="mt-12 text-center">
          <Button href="/portfolio" variant="outline">
            Explore the full portfolio
          </Button>
        </div>
      </Section>

      {/* 5 — Silent background video */}
      <VideoShowcase />

      {/* 6 — FAQs */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Good to know"
          title="Frequently asked questions"
          intro="A few things couples and clients often ask. Have another question? Just ask our concierge."
        />
        <FAQAccordion faqs={faqs} />
      </Section>

      {/* 7 — Google reviews + Instagram testimonials */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="Kind words"
          title="What our clients say"
          intro="Real reviews from Google, and love from our Instagram community."
        />
        <GoogleReviews />
        <div className="mt-16">
          <InstagramStrip />
        </div>
      </Section>

      {/* 8 — Blog */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Journal"
          title="From our blog"
          intro="Planning tips, trends and inspiration for your celebration."
        />
        <LatestPosts />
        <div className="mt-12 text-center">
          <Button href="/blog" variant="outline">
            Read the blog
          </Button>
        </div>
      </Section>

      {/* 9 — Company details */}
      <Section tone="cream">
        <CompanyDetails />
      </Section>
    </>
  );
}
