import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import TeamShowcase from "@/components/sections/TeamShowcase";
import TestimonialsCarousel from "@/components/sections/TestimonialsCarousel";
import InquiryDrawer from "@/components/shared/InquiryDrawer";
import AnimatedStat from "@/components/shared/AnimatedStat";
import ValueIcon from "@/components/shared/ValueIcon";
import { values as fbValues } from "@/lib/content";
import { getTeam, getPageBanner } from "@/lib/cms/home";
import { getSiteSettings, getTestimonials } from "@/lib/cms/content";
import { getPageContent, getCoreValues, getAboutStats } from "@/lib/cms/about";

const DEFAULT_DESCRIPTION =
  "Meet Ashraya Events — a wedding & event planning studio crafting warm, elegant, unforgettable celebrations.";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const hero = await getPageContent("about_hero");
  return {
    title: hero.seoTitle || "About Us",
    description: hero.seoDescription || DEFAULT_DESCRIPTION,
  };
}

export default async function AboutPage() {
  const [team, settings, banner, hero, story, cta, coreValues, stats, allTestimonials] =
    await Promise.all([
      getTeam(),
      getSiteSettings(),
      getPageBanner("About"),
      getPageContent("about_hero"),
      getPageContent("about_story"),
      getPageContent("about_cta"),
      getCoreValues(),
      getAboutStats(),
      getTestimonials(),
    ]);

  const aboutImage =
    story.mediaUrl ||
    settings.aboutImage ||
    "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=70&auto=format&fit=crop";

  const featuredTestimonials = allTestimonials.filter((t) => t.isFeatured);
  const testimonialItems = featuredTestimonials.length ? featuredTestimonials : allTestimonials;

  return (
    <>
      {/* Hero — driven by About Page Editor → Hero Banner (falls back to the
          generic per-page banner + defaults if not yet configured). */}
      {hero.isPublished && (
        <PageHeader
          eyebrow="Our story"
          title={hero.title || banner?.title || "About Ashraya Events"}
          intro={
            hero.subtitle ||
            banner?.subtitle ||
            "Planners at heart, storytellers by craft — here to make your celebration effortless and unforgettable."
          }
          image={hero.mediaUrl || banner?.image}
        />
      )}
      {hero.isPublished && (
        <div className="bg-maroon pb-14 pt-2 text-center">
          <InquiryDrawer
            triggerLabel="Plan Your Event"
            triggerClassName="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3 text-sm font-semibold text-maroon-dark transition-transform hover:-translate-y-0.5 hover:bg-gold-dark hover:text-cream"
          />
        </div>
      )}

      {/* Brand Story */}
      {story.isPublished && (
        <Section tone="cream">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl2)] shadow-[var(--shadow-soft)]">
                <Image
                  src={aboutImage}
                  alt="Ashraya Events at work"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </Reveal>
            <Reveal delayIndex={1}>
              <p className="eyebrow text-gold-dark">Who we are</p>
              <h2 className="mt-4 text-4xl text-maroon sm:text-5xl text-balance">
                {story.title || "A celebration should feel personal."}
              </h2>
              <div className="mt-6 space-y-4 whitespace-pre-line text-lg leading-relaxed text-ink-soft">
                {story.bodyMarkdown || (
                  <>
                    <p>
                      Ashraya Events was founded on the belief that no two celebrations
                      should look the same. We start with your story — your people, your
                      taste, your traditions — and design an experience around it.
                    </p>
                    <p>
                      Over the years we&rsquo;ve planned weddings across cities and
                      borders, corporate events for growing brands, and intimate parties
                      that mean the world. Whatever the scale, our promise stays the
                      same: thoughtful design, honest guidance and flawless execution.
                    </p>
                  </>
                )}
              </div>
              <p className="mt-4 font-serif text-2xl text-maroon">
                &ldquo;We plan, so you can simply celebrate.&rdquo;
              </p>
            </Reveal>
          </div>
        </Section>
      )}

      {/* Metrics & Achievements */}
      <Section tone="sand" className="py-16 sm:py-20">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delayIndex={i} className="text-center">
              <p className="font-serif text-4xl text-gold-dark sm:text-5xl">
                <AnimatedStat value={s.value} suffix={s.prefixSuffix} />
              </p>
              <p className="mt-2 text-sm uppercase tracking-wider text-ink-soft">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Core Values */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Why choose us"
          title="What sets us apart"
          intro="The values that shape every celebration we touch."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(coreValues.length ? coreValues : fbValues).map((v, i) => (
            <Reveal key={v.title} delayIndex={i % 4}>
              <div className="flex h-full flex-col items-start gap-4 rounded-[var(--radius-xl2)] bg-white p-7 shadow-[0_10px_40px_-28px_rgba(74,16,32,0.4)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                  <ValueIcon name={v.icon} />
                </div>
                <div>
                  <h3 className="text-xl text-maroon">{v.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{v.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Leadership & Team */}
      <Section tone="white">
        <SectionHeading
          eyebrow="The team"
          title="The people behind the magic"
          intro="Tap a profile to read their full story."
        />
        <TeamShowcase team={team} />
      </Section>

      {/* Client Testimonials */}
      <Section tone="sand">
        <SectionHeading eyebrow="Kind words" title="What our clients say" />
        <TestimonialsCarousel items={testimonialItems} />
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-maroon py-24 text-cream">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <p className="eyebrow text-gold-light">Ready when you are</p>
          <h2 className="mx-auto mt-5 max-w-2xl text-4xl text-balance sm:text-5xl">
            {cta.title || "Come celebrate with us."}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-cream/80">
            {cta.subtitle ||
              "Tell us your vision and we'll bring it to life — beautifully, and without the stress."}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <InquiryDrawer
              triggerLabel="Get an Estimate"
              triggerClassName="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-base font-semibold text-maroon-dark transition-transform hover:-translate-y-0.5 hover:bg-gold-dark hover:text-cream"
            />
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="border-cream/50 text-cream hover:bg-cream hover:text-maroon"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
