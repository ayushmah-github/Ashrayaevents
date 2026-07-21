import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";

/**
 * Centered statement + CTAs, sitting just under the hero photo (the value prop
 * the clean image intentionally omits). Event-Tales-style storytelling intro.
 */
export default function IntroBand() {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <Container className="text-center">
        <Reveal>
          <p className="eyebrow text-gold-dark">Weddings · Celebrations · Events</p>
          <h1 className="mx-auto mt-5 max-w-3xl text-4xl leading-tight text-maroon text-balance sm:text-5xl md:text-6xl">
            Crafting timeless celebrations with royal elegance.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            {site.name} — a home for your events. We design and deliver
            unforgettable weddings, destination celebrations and grand occasions,
            effortlessly and stress-free.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Button href="/estimate" variant="primary" size="lg">
              Plan Your Event
            </Button>
            <a
              href={whatsappLink(site.contact.whatsapp, "Hi Ashraya Events! I'd love to plan an event.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-maroon/30 px-8 py-3.5 text-base font-semibold text-maroon transition-colors hover:bg-maroon hover:text-cream"
            >
              💬 WhatsApp us
            </a>
          </div>
          <div className="rule-gold mx-auto mt-12 w-24" />
        </Reveal>
      </Container>
    </section>
  );
}
