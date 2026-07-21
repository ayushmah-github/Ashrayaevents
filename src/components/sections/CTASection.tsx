import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";

/** Final call-to-action band. Reused on Home and most inner pages. */
export default function CTASection({
  title = "Let's plan something unforgettable.",
  subtitle = "Tell us your vision and we'll bring it to life — beautifully, and without the stress.",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-maroon py-24 text-cream">
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
      <Container className="relative text-center">
        <Reveal>
          <p className="eyebrow text-gold-light">Ready when you are</p>
          <h2 className="mx-auto mt-5 max-w-2xl text-4xl text-balance sm:text-5xl">{title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-cream/80">{subtitle}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href="/estimate" variant="gold" size="lg">
              Get an Estimate
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="border-cream/50 text-cream hover:bg-cream hover:text-maroon"
            >
              Contact Us
            </Button>
            <a
              href={whatsappLink(site.contact.whatsapp, "Hi Ashraya Events! I'd love to plan an event.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cream/90 underline-offset-4 hover:text-gold hover:underline"
            >
              or WhatsApp us →
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
