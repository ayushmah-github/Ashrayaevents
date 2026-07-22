import Image from "next/image";
import Link from "next/link";
import { getPortfolio } from "@/lib/cms/content";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

/** "Wedding Stories" — tall portrait cards of past celebrations. */
export default async function WeddingStories() {
  const stories = (await getPortfolio()).slice(0, 4);
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container size="wide">
        <div className="mb-10 flex justify-center">
          <Button href="/portfolio" variant="primary">
            Our Work
          </Button>
        </div>
        <div className="text-center">
          <h2 className="font-serif text-4xl text-maroon sm:text-5xl">Wedding Stories</h2>
          <p className="mt-2 text-ink-soft">Special moments we&rsquo;ve had the joy of creating.</p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stories.map((s, i) => (
            <Reveal key={s.id} delayIndex={i % 4} as="div">
              <Link href="/portfolio" className="group block">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="mt-3 text-center font-serif text-lg text-maroon">{s.title}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
