import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import type { DestinationBlock as Block } from "@/lib/content";

/** Bullets are stored one-per-line in a single textarea (admin-friendly). */
function toList(bullets?: string) {
  return (bullets ?? "")
    .split("\n")
    .map((b) => b.trim())
    .filter(Boolean);
}

function Bullets({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span aria-hidden className="mt-1.5 text-gold-dark">
            ✦
          </span>
          <span className="leading-relaxed text-ink-soft">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Body({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p className="mt-5 whitespace-pre-line text-lg leading-relaxed text-ink-soft">{text}</p>
  );
}

/**
 * One editable content block on a destination/city landing page. The `layout`
 * field picks the presentation — plain text, text beside an image (either
 * side), a bulleted list, or a pulled-out highlight band.
 */
export default function DestinationBlock({ block }: { block: Block }) {
  const items = toList(block.bullets);
  const layout = block.layout ?? "text";

  if (layout === "highlight") {
    return (
      <Reveal>
        <div className="rounded-[var(--radius-xl2)] border-l-4 border-gold bg-sand/60 p-8 sm:p-10">
          {block.heading && (
            <h2 className="text-3xl text-maroon sm:text-4xl text-balance">{block.heading}</h2>
          )}
          <Body text={block.body} />
          <Bullets items={items} />
        </div>
      </Reveal>
    );
  }

  if ((layout === "image-left" || layout === "image-right") && block.image) {
    const imageFirst = layout === "image-left";
    return (
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className={imageFirst ? "" : "lg:order-2"}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl2)] shadow-[var(--shadow-soft)]">
            <Image
              src={block.image}
              alt={block.heading || "Ashraya Events celebration"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <Reveal delayIndex={1} className={imageFirst ? "" : "lg:order-1"}>
          {block.heading && (
            <h2 className="text-3xl text-maroon sm:text-4xl text-balance">{block.heading}</h2>
          )}
          <Body text={block.body} />
          <Bullets items={items} />
        </Reveal>
      </div>
    );
  }

  // "text" and "bullets" — a centred, readable column.
  return (
    <Reveal className="mx-auto max-w-3xl">
      {block.heading && (
        <h2 className="text-3xl text-maroon sm:text-4xl text-balance">{block.heading}</h2>
      )}
      <Body text={block.body} />
      <Bullets items={items} />
    </Reveal>
  );
}
