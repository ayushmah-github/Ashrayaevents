import Image from "next/image";
import Link from "next/link";
import { finalPrice, type Decoration } from "@/lib/store-data";

/** Product card for a decoration. */
export default function DecorationCard({ d }: { d: Decoration }) {
  const price = finalPrice(d);
  return (
    <Link
      href={`/decorations/${d.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-xl2)] bg-white shadow-[0_10px_40px_-28px_rgba(74,16,32,0.4)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-soft)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {d.images[0] && (
          <Image
            src={d.images[0]}
            alt={d.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        {d.discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-maroon px-3 py-1 text-xs font-semibold text-cream">
            {d.discount}% OFF
          </span>
        )}
        {!d.availability && (
          <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-cream">
            Sold out
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">{d.category}</p>
        <h3 className="mt-1 line-clamp-2 font-serif text-xl leading-snug text-maroon">{d.title}</h3>
        <p className="mt-1 text-sm text-ink-soft">
          {d.city}
          {d.area ? `, ${d.area}` : ""} {d.rating ? `· ★ ${d.rating}` : ""}
        </p>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-serif text-2xl text-maroon">₹{price.toLocaleString("en-IN")}</span>
          {d.discount > 0 && (
            <span className="text-sm text-ink-soft line-through">₹{d.price.toLocaleString("en-IN")}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
