import Image from "next/image";
import Container from "@/components/ui/Container";
import { getAwards } from "@/lib/cms/home";

/** "As seen in" trust band. Editable in admin → Home · Awards / As seen in. */
export default async function AwardsStrip() {
  const awards = await getAwards();
  return (
    <section className="border-b border-maroon/10 bg-cream py-8">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft">
          As seen in
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {awards.map((a) =>
            a.image ? (
              <div key={a.name} className="relative h-10 w-28">
                <Image src={a.image} alt={a.name} fill className="object-contain" sizes="112px" />
              </div>
            ) : (
              <span
                key={a.name}
                className="font-serif text-lg text-maroon/70 transition-colors hover:text-maroon"
              >
                {a.name}
              </span>
            ),
          )}
        </div>
      </Container>
    </section>
  );
}
