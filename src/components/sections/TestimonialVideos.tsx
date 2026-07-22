import { site } from "@/lib/site";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";

/**
 * "Testimonials" — a warm intro + YouTube testimonial films (Shaandaar-style).
 * Uses site.youtubeVideoIds. [PLACEHOLDER] swap for the client's real videos.
 */
export default function TestimonialVideos() {
  const ids = site.youtubeVideoIds.slice(0, 2);
  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container>
        <Reveal>
          <h2 className="font-serif text-3xl text-maroon sm:text-4xl">
            Begin your wedding journey with {site.name}
          </h2>
          <div className="mt-5 max-w-3xl space-y-4 leading-relaxed text-ink-soft">
            <p>
              {site.name} makes sure you never feel overwhelmed while planning your
              wedding — we handle every decision so each little detail is taken
              care of, and every moment becomes a beautiful memory.
            </p>
            <p>
              Reach out today and let&rsquo;s work together to listen to your
              story and create the wedding of your dreams. We promise to make your
              dream celebration a reality.
            </p>
          </div>
        </Reveal>

        <h3 className="mt-16 text-center font-serif text-3xl text-maroon sm:text-4xl">
          {site.name} Testimonials
        </h3>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {ids.map((id, i) => (
            <Reveal key={id} delayIndex={i % 2} as="div">
              <div className="overflow-hidden rounded-[var(--radius-xl2)] bg-maroon-dark shadow-[var(--shadow-soft)]">
                <div className="relative aspect-video">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${id}`}
                    title={`${site.name} testimonial film`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
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
