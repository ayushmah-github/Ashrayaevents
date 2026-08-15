import Image from "next/image";
import { getHomeCategories } from "@/lib/cms/home";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/**
 * "Wedding Categories" — Shaandaar-style pastel banners: a flat colour block
 * with a circular photo bleeding off the right edge. Editable in admin →
 * Home · Wedding Categories.
 */
export default async function WeddingCategories() {
  const weddingCategories = await getHomeCategories();
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container size="wide">
        <div className="text-center">
          <h2 className="font-serif text-3xl uppercase tracking-wide text-ink sm:text-4xl">
            Wedding Categories
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-ink/40" />
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 md:gap-5">
          {weddingCategories.map((c, i) => (
            <Reveal key={c.title} delayIndex={i % 2}>
              <div
                className="relative h-36 overflow-hidden sm:h-40"
                style={{ backgroundColor: c.tint }}
              >
                <div className="relative z-10 max-w-[62%] py-4 pl-7 pr-3 sm:max-w-[58%] sm:pl-9">
                  <h3 className="font-serif text-2xl text-ink sm:text-3xl">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.description}</p>
                </div>
                <div
                  className="absolute right-[-8%] top-1/2 aspect-square h-[135%] -translate-y-1/2 overflow-hidden rounded-full sm:right-[-6%]"
                >
                  <Image src={c.image} alt={c.title} fill sizes="240px" className="object-cover" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
