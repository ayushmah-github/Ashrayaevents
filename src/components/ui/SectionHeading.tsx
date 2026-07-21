import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

/** Eyebrow + serif title + optional intro, centered or left-aligned. */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "dark",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
  className?: string;
}) {
  const light = tone === "light";
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow mb-4", light ? "text-gold-light" : "text-gold-dark")}>
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-4xl sm:text-5xl text-balance",
          light ? "text-cream" : "text-maroon",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed",
            light ? "text-cream/80" : "text-ink-soft",
          )}
        >
          {intro}
        </p>
      )}
      <div
        className={cn(
          "rule-gold mt-7 w-24",
          align === "center" && "mx-auto",
        )}
      />
    </Reveal>
  );
}
