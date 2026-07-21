import Image from "next/image";
import Link from "next/link";
import { getServices } from "@/lib/cms/content";
import Reveal from "@/components/ui/Reveal";

/** Grid of service cards. Used on Home (teaser) and the Services page. */
export default async function ServicesGrid({ limit }: { limit?: number }) {
  const services = await getServices();
  const list = limit ? services.slice(0, limit) : services;
  return (
    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((service, i) => (
        <Reveal key={service.slug} delayIndex={i % 3} as="div">
          <Link
            href={`/services#${service.slug}`}
            className="group block h-full overflow-hidden rounded-[var(--radius-xl2)] bg-white shadow-[0_10px_40px_-24px_rgba(74, 16, 32,0.4)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-soft)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl text-maroon">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{service.short}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-dark transition-colors group-hover:text-maroon">
                Explore <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
