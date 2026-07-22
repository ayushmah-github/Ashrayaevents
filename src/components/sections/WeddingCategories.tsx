import Image from "next/image";
import { weddingCategories } from "@/lib/content";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

/** "Wedding Categories" — pastel cards with a title, blurb and rounded image. */
export default function WeddingCategories() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading eyebrow="What we specialise in" title="Wedding Categories" />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {weddingCategories.map((c, i) => (
            <Reveal key={c.title} delayIndex={i % 2}>
              <div
                className="flex items-center gap-5 overflow-hidden rounded-[var(--radius-xl2)] p-6 sm:p-7"
                style={{ backgroundColor: c.tint }}
              >
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-2xl text-maroon sm:text-3xl">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.description}</p>
                </div>
                <div className="relative h-28 w-28 flex-none overflow-hidden rounded-2xl sm:h-32 sm:w-32">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
