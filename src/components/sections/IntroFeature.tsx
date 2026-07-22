import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/**
 * "Experience royal elegance…" — headline + two overlapping images + a long
 * descriptive paragraph, echoing Shaandaar's intro section.
 */
export default function IntroFeature() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container size="wide">
        <Reveal>
          <h2 className="mx-auto max-w-4xl text-center font-serif text-4xl leading-tight text-maroon text-balance sm:text-5xl md:text-[3.25rem]">
            Experience royal elegance with a wedding planner devoted to timeless
            Indian celebrations.
          </h2>
        </Reveal>

        <div className="mt-14 grid items-start gap-10 lg:grid-cols-2">
          {/* Overlapping images */}
          <Reveal className="relative mx-auto w-full max-w-lg">
            <div className="relative aspect-[4/5] w-3/4 overflow-hidden rounded-[var(--radius-xl2)] shadow-[var(--shadow-soft)]">
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=70&auto=format&fit=crop"
                alt="An elegant Indian wedding by Ashraya Events"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-10 right-0 aspect-[4/5] w-3/5 overflow-hidden rounded-[var(--radius-xl2)] border-4 border-cream shadow-[var(--shadow-soft)]">
              <Image
                src="https://images.unsplash.com/photo-1533928298208-27ff66555d8d?w=800&q=70&auto=format&fit=crop"
                alt="A destination wedding setup"
                fill
                sizes="(max-width: 1024px) 60vw, 25vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Long copy — [PLACEHOLDER] replace with the client's real intro */}
          <Reveal delayIndex={1} className="mt-12 lg:mt-0">
            <div className="space-y-5 leading-relaxed text-ink-soft">
              <p>
                Ashraya Events delivers exceptional wedding experiences that
                capture the unique essence of each couple through their style and
                personality. As a trusted name in event planning, we design
                elegant celebrations and magnificent destination weddings across
                India and abroad.
              </p>
              <p>
                Whether you dream of an intimate ceremony or an extraordinary
                royal wedding, our planners bring it to life — from concept and
                venue to décor, hospitality and flawless on-the-day coordination.
                Every detail is considered, so you can be fully present for the
                moments that matter.
              </p>
              <p>
                We believe a wedding is a once-in-a-lifetime experience that
                should reflect the joy of two families coming together — and leave
                every guest with memories they&rsquo;ll cherish for a lifetime.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
