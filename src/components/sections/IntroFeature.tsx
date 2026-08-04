import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { getSiteSettings } from "@/lib/cms/content";

const DEFAULT_TITLE =
  "Experience royal elegance with a wedding planner devoted to timeless Indian celebrations.";
const DEFAULT_BODY =
  "Ashraya Events delivers exceptional wedding experiences that capture the unique essence of each couple through their style and personality. As a trusted name in event planning, we design elegant celebrations and magnificent destination weddings across India and abroad.\n\nWhether you dream of an intimate ceremony or an extraordinary royal wedding, our planners bring it to life — from concept and venue to décor, hospitality and flawless on-the-day coordination. We believe a wedding is a once-in-a-lifetime experience that should reflect the joy of two families coming together, and leave every guest with memories they'll cherish for a lifetime.";
const DEFAULT_IMG1 =
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=70&auto=format&fit=crop";
const DEFAULT_IMG2 =
  "https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=800&q=70&auto=format&fit=crop";

/**
 * "Experience royal elegance…" — heading top-right, two SEPARATE staggered
 * images on the left, long copy on the right. All fields editable in the admin
 * (Site Settings → Intro heading / paragraph / images 1 & 2).
 */
export default async function IntroFeature() {
  const s = await getSiteSettings();
  const title = s.introTitle || DEFAULT_TITLE;
  const body = s.introBody || DEFAULT_BODY;
  const img1 = s.introImage1 || DEFAULT_IMG1;
  const img2 = s.introImage2 || DEFAULT_IMG2;

  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container size="wide">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-8">
          {/* Heading — top, spanning wide to the right */}
          <Reveal className="lg:col-span-8 lg:col-start-5 lg:row-start-1 lg:self-start">
            <h2 className="font-serif text-4xl leading-tight text-maroon text-balance sm:text-5xl">
              {title}
            </h2>
          </Reveal>

          {/* Image 1 — top-left */}
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl2)] shadow-[var(--shadow-soft)] lg:col-span-4 lg:col-start-1 lg:row-start-1">
            <Image
              src={img1}
              alt="An elegant Indian wedding by Ashraya Events"
              fill
              sizes="(max-width: 1024px) 100vw, 32vw"
              className="object-cover"
            />
          </Reveal>

          {/* Image 2 — centre, lower (staggered, separate) */}
          <Reveal
            delayIndex={1}
            className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-xl2)] shadow-[var(--shadow-soft)] lg:col-span-4 lg:col-start-5 lg:row-start-2 lg:-mt-28"
          >
            <Image
              src={img2}
              alt="A destination wedding setup by Ashraya Events"
              fill
              sizes="(max-width: 1024px) 100vw, 32vw"
              className="object-cover"
            />
          </Reveal>

          {/* Paragraph — narrow, far right, aligned with image 2 */}
          <Reveal
            delayIndex={1}
            className="whitespace-pre-line leading-relaxed text-ink-soft lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:-mt-28"
          >
            {body}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
