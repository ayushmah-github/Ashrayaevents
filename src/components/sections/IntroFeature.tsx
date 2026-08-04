import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getSiteSettings } from "@/lib/cms/content";

const DEFAULT_TITLE =
  "Experience royal elegance with a wedding planner devoted to timeless Indian celebrations.";
const DEFAULT_BODY =
  "Ashraya Events delivers exceptional wedding experiences that capture the unique essence of each couple through their style and personality. As a trusted name in event planning, we design elegant celebrations and magnificent destination weddings across India and abroad.\n\nWhether you dream of an intimate ceremony or an extraordinary royal wedding, our planners bring it to life — from concept and venue to décor, hospitality and flawless on-the-day coordination, leaving every guest with memories they'll cherish for a lifetime.";
const DEFAULT_IMG =
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=75&auto=format&fit=crop";

/**
 * Elegant intro — a single portrait image alongside the heading + copy.
 * Editable in the admin (Site Settings → Intro heading / paragraph / image 1).
 */
export default async function IntroFeature() {
  const s = await getSiteSettings();
  const title = s.introTitle || DEFAULT_TITLE;
  const body = s.introBody || DEFAULT_BODY;
  const img = s.introImage1 || DEFAULT_IMG;

  return (
    <section className="bg-cream py-24 sm:py-32">
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <Reveal className="relative">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[var(--radius-xl2)] shadow-[var(--shadow-soft)]">
              <Image
                src={img}
                alt="An elegant Indian wedding by Ashraya Events"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
            {/* subtle gold frame accent */}
            <div className="pointer-events-none absolute -bottom-4 -left-4 -z-10 hidden h-full w-full rounded-[var(--radius-xl2)] border border-gold/40 lg:block" />
          </Reveal>

          {/* Text */}
          <Reveal delayIndex={1}>
            <p className="eyebrow text-gold-dark">Royal elegance</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-maroon text-balance sm:text-5xl">
              {title}
            </h2>
            <div className="rule-gold mt-7 w-24" />
            <div className="mt-7 max-w-xl space-y-4 whitespace-pre-line text-lg leading-relaxed text-ink-soft">
              {body}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
