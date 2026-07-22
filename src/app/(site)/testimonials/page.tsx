import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Stars from "@/components/shared/Stars";
import CTASection from "@/components/sections/CTASection";
import { getTestimonials } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read what couples and clients say about celebrating with Ashraya Events.",
};

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();
  return (
    <>
      <PageHeader
        eyebrow="Kind words"
        title="Testimonials"
        intro="The trust of our couples and clients means everything to us. Here's what they had to say."
      />

      <Section tone="cream">
        {/* [PLACEHOLDER] add real client reviews in lib/content.ts */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delayIndex={i % 3} className="break-inside-avoid">
              <figure className="rounded-[var(--radius-xl2)] bg-white p-7 shadow-[0_10px_40px_-28px_rgba(74, 16, 32,0.4)]">
                <Stars count={t.rating} />
                <blockquote className="mt-4 leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 border-t border-sand pt-4 text-sm">
                  <span className="font-semibold text-maroon">{t.name}</span>
                  <span className="block text-ink-soft">
                    {t.event} · {t.location}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection title="We'd love to plan yours next." />
    </>
  );
}
