import type { Metadata } from "next";
import Image from "next/image";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/shared/Breadcrumb";
import PhotoGallery from "@/components/sections/PhotoGallery";
import InstagramStrip from "@/components/sections/InstagramStrip";
import InquiryDrawer from "@/components/shared/InquiryDrawer";
import { collageImages as fallbackGallery } from "@/lib/content";
import { getPageContent, getRecognitions, getDestinations } from "@/lib/cms/about";

const DEFAULT_DESCRIPTION =
  "Meet Ashraya Events — a wedding & event planning studio crafting warm, elegant, unforgettable celebrations.";
const DEFAULT_INTRO =
  "We like being upfront about how we work — so before anything else, you can see how we think, how we plan, and decide for yourself if we're the right fit for your celebration.";

const DEFAULT_FOUNDER_IMAGE =
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=70&auto=format&fit=crop";
const DEFAULT_JOURNEY_IMAGE =
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=70&auto=format&fit=crop";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const hero = await getPageContent("about_hero");
  return {
    title: hero.seoTitle || "About Us",
    description: hero.seoDescription || DEFAULT_DESCRIPTION,
  };
}

export default async function AboutPage() {
  const [hero, founder, approach, personal, journey, cta, recognitions, destinations] =
    await Promise.all([
      getPageContent("about_hero"),
      getPageContent("about_founder"),
      getPageContent("about_approach"),
      getPageContent("about_personal"),
      getPageContent("about_journey"),
      getPageContent("about_cta"),
      getRecognitions(),
      getDestinations(),
    ]);

  const domestic = destinations.filter((d) => d.region === "Domestic");
  const international = destinations.filter((d) => d.region === "International");

  const galleryImages = hero.galleryImages?.length
    ? hero.galleryImages
    : hero.mediaUrl
      ? [hero.mediaUrl]
      : fallbackGallery.slice(0, 6);

  return (
    <>
      {/* Hero: a photo gallery/banner up top, then a plain "About Us" intro
          with the primary CTA — matches the reference site's layout of a
          photo band followed by a text-only section, rather than one big
          image with the headline overlaid on it. */}
      {hero.isPublished && (
        <>
          <PhotoGallery images={galleryImages} />
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />

          <Section tone="cream" className="text-center">
            <Reveal className="mx-auto max-w-2xl">
              <h1 className="text-4xl text-maroon sm:text-5xl text-balance">
                {hero.title || "About Us"}
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
                {hero.subtitle || DEFAULT_INTRO}
              </p>
            </Reveal>
            <div className="mt-8">
              <InquiryDrawer
                triggerLabel="Inquire Now"
                triggerClassName="inline-flex items-center gap-2 rounded-full bg-maroon px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-cream transition-transform hover:-translate-y-0.5 hover:bg-maroon-dark"
              />
            </div>
          </Section>
        </>
      )}

      {/* Founder Spotlight */}
      {founder.isPublished && (
        <Section tone="cream">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl2)] shadow-[var(--shadow-soft)]">
                <Image
                  src={founder.mediaUrl || DEFAULT_FOUNDER_IMAGE}
                  alt={founder.title || "Founder of Ashraya Events"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delayIndex={1}>
              <p className="eyebrow text-gold-dark">Meet the founder</p>
              <h2 className="mt-4 text-4xl text-maroon sm:text-5xl text-balance">
                {founder.title || "[PLACEHOLDER] Founder Name"}
              </h2>
              {founder.subtitle && (
                <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-gold-dark">
                  {founder.subtitle}
                </p>
              )}
              <div className="mt-6 whitespace-pre-line text-lg leading-relaxed text-ink-soft">
                {founder.bodyMarkdown ||
                  "[PLACEHOLDER] The founder's story — what led them to start Ashraya Events, their planning philosophy, and what they bring to every celebration."}
              </div>
            </Reveal>
          </div>
        </Section>
      )}

      {/* Our Approach */}
      {approach.isPublished && (
        <Section tone="sand">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-gold-dark">Our approach</p>
            <h2 className="mt-4 text-4xl text-maroon sm:text-5xl text-balance">
              {approach.title || "Our Approach"}
            </h2>
            <div className="mx-auto mt-6 space-y-4 whitespace-pre-line text-left text-lg leading-relaxed text-ink-soft sm:text-center">
              {approach.bodyMarkdown ||
                "We believe planning a celebration is about more than logistics — it's about understanding people, emotions and the story behind every gathering. We take on a limited number of events at a time, so we can give each one our full creativity and attention, from the first conversation to the very last farewell."}
            </div>
          </Reveal>
        </Section>
      )}

      {/* Personal by Design */}
      {personal.isPublished && (
        <Section tone="cream">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow text-gold-dark">Our philosophy</p>
            <h2 className="mt-4 text-4xl text-maroon sm:text-5xl text-balance">
              {personal.title || "Personal by Design"}
            </h2>
            <div className="mx-auto mt-6 space-y-4 whitespace-pre-line text-left text-lg leading-relaxed text-ink-soft sm:text-center">
              {personal.bodyMarkdown ||
                "What defines an Ashraya celebration is the personalisation behind it — the small, thoughtful details that turn an event into a memory. A colour palette that reflects you, a welcome note in your own words, a detail only your closest guests will notice. Behind every relaxed, effortless day sits a meticulously planned one."}
            </div>
          </Reveal>
        </Section>
      )}

      {/* Our Journey */}
      {journey.isPublished && (
        <Section tone="sand">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal delayIndex={1} className="order-2 lg:order-1">
              <p className="eyebrow text-gold-dark">Our journey</p>
              <h2 className="mt-4 text-4xl text-maroon sm:text-5xl text-balance">
                {journey.title || "A Journey Beyond Borders"}
              </h2>
              <div className="mt-6 whitespace-pre-line text-lg leading-relaxed text-ink-soft">
                {journey.bodyMarkdown ||
                  "[PLACEHOLDER] Ashraya Events began with a simple belief — that every celebration deserves to feel personal and unforgettable. What started small has grown into a studio trusted for weddings and events across cities and destinations, each one carrying the same philosophy: thoughtful, elegant, and designed around you."}
              </div>
            </Reveal>
            <Reveal className="order-1 lg:order-2">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl2)] shadow-[var(--shadow-soft)]">
                <Image
                  src={journey.mediaUrl || DEFAULT_JOURNEY_IMAGE}
                  alt="Ashraya Events celebration"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Section>
      )}

      {/* Recognised Excellence */}
      {recognitions.length > 0 && (
        <Section tone="cream">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-gold-dark">Recognised excellence</p>
            <h2 className="mt-4 text-4xl text-maroon sm:text-5xl text-balance">
              Honoured, but not defined by it
            </h2>
          </Reveal>
          <ul className="mx-auto mt-10 max-w-xl space-y-4">
            {recognitions.map((r, i) => (
              <Reveal key={r} delayIndex={i % 4}>
                <li className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-[0_10px_40px_-30px_rgba(74,16,32,0.4)]">
                  <span className="mt-0.5 text-gold-dark">✦</span>
                  <span className="text-ink">{r}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-xl text-center text-ink-soft">
            While these honours mean a great deal to us, our greatest reward is
            still hearing a couple say their celebration felt truly like them.
          </p>
        </Section>
      )}

      {/* Destinations */}
      {destinations.length > 0 && (
        <Section tone="sand">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-gold-dark">Where we celebrate</p>
            <h2 className="mt-4 text-4xl text-maroon sm:text-5xl text-balance">Destinations</h2>
          </Reveal>
          <div className="mx-auto mt-12 grid max-w-2xl gap-10 sm:grid-cols-2">
            {domestic.length > 0 && (
              <Reveal>
                <h3 className="text-xl text-maroon">India</h3>
                <ul className="mt-4 space-y-2 text-ink-soft">
                  {domestic.map((d) => (
                    <li key={d.name}>{d.name}</li>
                  ))}
                </ul>
              </Reveal>
            )}
            {international.length > 0 && (
              <Reveal delayIndex={1}>
                <h3 className="text-xl text-maroon">International</h3>
                <ul className="mt-4 space-y-2 text-ink-soft">
                  {international.map((d) => (
                    <li key={d.name}>{d.name}</li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </Section>
      )}

      {/* Instagram */}
      <Section tone="cream">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold-dark">Follow along</p>
          <h2 className="mt-4 text-4xl text-maroon sm:text-5xl text-balance">
            Moments, as they happen
          </h2>
        </Reveal>
        <InstagramStrip />
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
