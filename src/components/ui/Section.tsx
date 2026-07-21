import { cn } from "@/lib/utils";
import Container from "./Container";

type Tone = "cream" | "sand" | "maroon" | "sage" | "white";

const toneClasses: Record<Tone, string> = {
  cream: "bg-cream text-ink",
  white: "bg-white text-ink",
  sand: "bg-sand text-ink",
  sage: "bg-sage text-ink",
  maroon: "bg-maroon text-cream",
};

/** Full-bleed vertical section with a tone background + inner Container. */
export default function Section({
  children,
  className,
  tone = "cream",
  containerSize = "default",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: Tone;
  containerSize?: "default" | "narrow" | "wide";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("py-20 sm:py-28", toneClasses[tone], className)}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
