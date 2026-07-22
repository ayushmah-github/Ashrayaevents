import Image from "next/image";
import { capabilities } from "@/lib/content";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

/** "Services We Provide" — grid of image tiles with a dark overlay + title. */
export default function ServicesTiles() {
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading eyebrow="End-to-end" title="Services We Provide" />
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delayIndex={i % 4} as="div">
              <div className="group relative aspect-square overflow-hidden rounded-2xl">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/80 via-maroon-dark/25 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <h3 className="text-center font-serif text-xl leading-tight text-cream sm:text-2xl">
                    {c.title}
                  </h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
