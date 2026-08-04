import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getSiteSettings } from "@/lib/cms/content";

const DEFAULT_TITLE =
  "Experience royal elegance with a wedding planner devoted to timeless Indian celebrations.";
const DEFAULT_BODY =
  "Ashraya Events delivers exceptional wedding experiences that capture the unique essence of each couple through their style and personality. As a trusted name in event planning, we design elegant celebrations and magnificent destination weddings across India and abroad.\n\nWhether you dream of an intimate ceremony or an extraordinary royal wedding, our planners bring it to life — from concept and venue to décor, hospitality and flawless on-the-day coordination. We believe a wedding is a once-in-a-lifetime experience that should reflect the joy of two families coming together, and leave every guest with memories they'll cherish for a lifetime.";
const DEFAULT_IMG1 =
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=75&auto=format&fit=crop";
const DEFAULT_IMG2 =
  "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=900&q=75&auto=format&fit=crop";

/**
 * "Experience royal elegance…" — Shaandaar-style editorial layout: image 1
 * top-left, wide heading top-right, image 2 centre & lower, narrow copy far
 * right. All fields editable in the admin (Site Settings).
 */
export default async function IntroFeature() {
  const s = await getSiteSettings();
  const title = s.introTitle || DEFAULT_TITLE;
  const body = s.introBody || DEFAULT_BODY;
  const img1 = s.introImage1 || DEFAULT_IMG1;
  const img2 = s.introImage2 || DEFAULT_IMG2;

  return (
    <section className="bg-cream py-24 sm:py-32">
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — two separate, staggered images */}
          <div className="grid grid-cols-2 gap-5 sm:gap-6">
            <Reveal className="relative aspect-[3/4] self-start overflow-hidden rounded-[var(--radius-xl2)] shadow-[var(--shadow-soft)]">
              <Image
                src={img1}
                alt="An elegant Indian wedding by Ashraya Events"
                fill
                sizes="(max-width: 1024px) 45vw, 22vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal
              delayIndex={1}
              className="relative mt-10 aspect-[3/4] overflow-hidden rounded-[var(--radius-xl2)] shadow-[var(--shadow-soft)] sm:mt-16"
            >
              <Image
                src={img2}
                alt="A destination wedding setup by Ashraya Events"
                fill
                sizes="(max-width: 1024px) 45vw, 22vw"
                className="object-cover"
              />
            </Reveal>
          </div>

          {/* Right — heading + copy */}
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
