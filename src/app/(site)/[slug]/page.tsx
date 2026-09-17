import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Breadcrumb from "@/components/shared/Breadcrumb";
import InquiryDrawer from "@/components/shared/InquiryDrawer";
import PhotoRow from "@/components/sections/PhotoRow";
import DestinationBlock from "@/components/sections/DestinationBlock";
import FAQAccordion from "@/components/sections/FAQAccordion";
import GoogleReviews from "@/components/sections/GoogleReviews";
import AwardsStrip from "@/components/sections/AwardsStrip";
import LatestPosts from "@/components/sections/LatestPosts";
import InstagramStrip from "@/components/sections/InstagramStrip";
import CTASection from "@/components/sections/CTASection";
import { getDestinationPage } from "@/lib/cms/destination-pages";

export const dynamic = "force-dynamic";

const CTA_CLASS =
  "inline-flex items-center gap-2 rounded-full bg-maroon px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-cream transition-transform hover:-translate-y-0.5 hover:bg-maroon-dark";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getDestinationPage(slug);
  if (!page) return {};
  return {
    title: page.seoTitle || `Wedding Planners in ${page.city}`,
    description:
      page.seoDescription ||
      `Ashraya Events plans weddings in ${page.city} — venue, décor, catering, hospitality and full on-ground execution.`,
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getDestinationPage(slug);

  // Any unmatched top-level path falls through to the normal 404.
  if (!page) notFound();

  return (
    <>
      <PageHeader
        eyebrow={page.region === "International" ? "Destination weddings" : "Wedding planning"}
        title={page.heroTitle || `Wedding Planners in ${page.city}`}
        intro={page.heroBody}
        image={page.heroImage}
      />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Destinations" },
          { label: page.city },
        ]}
      />

      <Section tone="cream" className="text-center">
        <InquiryDrawer
          triggerLabel={`Plan Your ${page.city} Wedding`}
          triggerClassName={CTA_CLASS}
        />
      </Section>

      {page.blocks.length > 0 && (
        <Section tone="cream" className="space-y-20 pt-0">
          {page.blocks.map((block, i) => (
            <DestinationBlock key={`${block.heading ?? "block"}-${i}`} block={block} />
          ))}
        </Section>
      )}

      {page.galleryImages && page.galleryImages.length > 0 && (
        <PhotoRow images={page.galleryImages} />
      )}

      {(page.officeAddress || page.officePhone) && (
        <Section tone="sand">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-gold-dark">Find us</p>
            <h2 className="mt-4 text-3xl text-maroon sm:text-4xl text-balance">
              {page.officeName || `Ashraya Events — ${page.city}`}
            </h2>
            {page.officeAddress && (
              <p className="mt-5 whitespace-pre-line leading-relaxed text-ink-soft">
                {page.officeAddress}
              </p>
            )}
            {page.officePhone && (
              <p className="mt-3 text-lg text-maroon">{page.officePhone}</p>
            )}
          </Reveal>
        </Section>
      )}

      {page.faqs.length > 0 && (
        <Section tone="cream">
          <SectionHeading
            eyebrow="Wedding FAQs"
            title="Questions couples ask us"
            intro={`Everything worth knowing before you start planning in ${page.city}.`}
          />
          <FAQAccordion faqs={page.faqs.map((f) => ({ q: f.question, a: f.answer }))} />
        </Section>
      )}

      <Section tone="sand">
        <SectionHeading eyebrow="Google reviews" title="Words from our clients" />
        <GoogleReviews />
      </Section>

      <AwardsStrip />

      <Section tone="cream">
        <SectionHeading eyebrow="Our blogs" title="Planning notes & ideas" />
        <LatestPosts />
      </Section>

      <Section tone="cream" className="pt-0">
        <SectionHeading eyebrow="Follow along" title="Moments, as they happen" />
        <InstagramStrip />
      </Section>

      <CTASection
        title={`Planning a wedding in ${page.city}?`}
        subtitle="Tell us your dates and guest count — we'll come back with honest guidance and a clear proposal."
      />
    </>
  );
}
