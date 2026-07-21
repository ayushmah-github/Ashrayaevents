import Image from "next/image";
import Link from "next/link";
import { getPortfolio } from "@/lib/cms/content";
import Reveal from "@/components/ui/Reveal";

/** Masonry-ish featured gallery preview for the Home page. */
export default async function GalleryPreview({ limit = 6 }: { limit?: number }) {
  const items = (await getPortfolio()).slice(0, limit);
  return (
    <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {items.map((item, i) => (
        <Reveal
          key={item.id}
          delayIndex={i % 3}
          as="div"
          className={i === 0 ? "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2" : ""}
        >
          <Link
            href="/portfolio"
            className="group relative block h-full overflow-hidden rounded-2xl"
          >
            <div className={`relative ${i === 0 ? "aspect-square lg:aspect-[4/3]" : "aspect-square"}`}>
              <Image
                src={item.image}
                alt={`${item.title} — ${item.category}`}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-maroon-dark/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="p-4 text-cream">
                  <p className="font-serif text-lg">{item.title}</p>
                  <p className="text-xs text-cream/80">{item.category} · {item.location}</p>
                </div>
              </div>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
