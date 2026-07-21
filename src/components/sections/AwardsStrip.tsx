import Container from "@/components/ui/Container";

// [PLACEHOLDER] Replace with the client's real press / award logos (drop images
// in /public and swap the text below for <Image> badges).
const AWARDS = [
  "WeddingWire India",
  "WedMeGood",
  "WeddingSutra",
  "The Knot",
  "Featured Weddings",
];

/** Thin "As seen in" trust band placed right under the hero. */
export default function AwardsStrip() {
  return (
    <section className="border-b border-maroon/10 bg-cream py-8">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
          As seen in
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {AWARDS.map((a) => (
            <span
              key={a}
              className="font-serif text-lg text-maroon/70 transition-colors hover:text-maroon"
            >
              {a}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
