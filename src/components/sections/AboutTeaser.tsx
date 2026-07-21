import Image from "next/image";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { getSiteSettings } from "@/lib/cms/content";

/** Home "about" teaser — image + intro copy (heading/story editable in Settings). */
export default async function AboutTeaser() {
  const settings = await getSiteSettings();
  const title = settings.storyTitle || "Planners at heart, storytellers by craft.";
  const body =
    settings.storyBody ||
    "Ashraya Events began with a simple belief — that every celebration deserves to feel personal, effortless and unforgettable. From intimate gatherings to grand weddings, we bring warmth, taste and meticulous planning to every detail.";

  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <Reveal className="order-2 lg:order-1">
        <p className="eyebrow text-gold-dark">Our story</p>
        <h2 className="mt-4 text-4xl text-maroon sm:text-5xl text-balance">{title}</h2>
        <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-ink-soft">{body}</p>
        <div className="mt-8">
          <Button href="/about" variant="outline">
            More about us
          </Button>
        </div>
      </Reveal>

      <Reveal delayIndex={1} className="order-1 lg:order-2">
        <div className="relative">
          {/* [PLACEHOLDER] brand/team photo */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl2)] shadow-[var(--shadow-soft)]">
            <Image
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1000&q=70&auto=format&fit=crop"
              alt="Ashraya Events planning a celebration"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-gold px-6 py-4 text-maroon-dark shadow-lg sm:block">
            <p className="font-serif text-2xl">10+ years</p>
            <p className="text-xs font-semibold uppercase tracking-wider">of celebrations</p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
