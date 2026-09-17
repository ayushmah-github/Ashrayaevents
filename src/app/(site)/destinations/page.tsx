import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Breadcrumb from "@/components/shared/Breadcrumb";
import CTASection from "@/components/sections/CTASection";
import { getPageBanner } from "@/lib/cms/home";
import { getDestinationPages, type DestinationPage } from "@/lib/cms/destination-pages";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Destinations",
  description:
    "Where Ashraya Events plans weddings — across India and international destinations, each with a dedicated planning team.",
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=70&auto=format&fit=crop";

export default async function DestinationsPage() {
  const [banner, pages] = await Promise.all([
    getPageBanner("Destinations"),
    getDestinationPages(),
  ]);

  const domestic = pages.filter((p) => p.region !== "International");
  const international = pages.filter((p) => p.region === "International");

  return (
    <>
      <PageHeader
        eyebrow="Where we celebrate"
        title={banner?.title || "Destinations"}
        intro={
          banner?.subtitle ||
          "Pick a city to see how we plan weddings there — venues, seasons, costs and everything worth knowing before you start."
        }
        image={banner?.image}
      />

      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Destinations" }]} />

      {pages.length === 0 ? (
        <Section tone="cream">
          <Reveal className="mx-auto max-w-xl text-center">
            <p className="text-lg text-ink-soft">
              Destination pages are on their way — in the meantime, tell us where
              you&rsquo;re planning and we&rsquo;ll take it from there.
            </p>
          </Reveal>
        </Section>
      ) : (
        <>
          {domestic.length > 0 && (
            <Section tone="cream">
              <SectionHeading
                eyebrow="Across India"
                title="Wedding planning in India"
                intro="From palace weddings in Rajasthan to hill-station celebrations up north."
              />
              <CityGrid pages={domestic} />
            </Section>
          )}

          {international.length > 0 && (
            <Section tone="sand">
              <SectionHeading
                eyebrow="Beyond borders"
                title="International weddings"
                intro="Destination celebrations planned from home and run on the ground."
              />
              <CityGrid pages={international} />
            </Section>
          )}
        </>
      )}

      <CTASection
        title="Don't see your destination?"
        subtitle="We plan weddings well beyond the cities listed here — tell us where you're headed."
      />
    </>
  );
}

function CityGrid({ pages }: { pages: DestinationPage[] }) {
  return (
    <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {pages.map((page, i) => (
        <Reveal key={page.slug} delayIndex={i % 3}>
          <Link
            href={`/${page.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-xl2)] bg-white shadow-[0_10px_40px_-28px_rgba(74,16,32,0.4)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-soft)]"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={page.heroImage || FALLBACK_IMAGE}
                alt={page.city}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-2xl text-maroon">{page.city}</h3>
              {page.heroBody && (
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                  {page.heroBody}
                </p>
              )}
              <span className="mt-5 inline-block border-b-2 border-maroon pb-1 text-xs font-semibold uppercase tracking-widest text-maroon transition-colors group-hover:border-gold-dark group-hover:text-gold-dark">
                Explore {page.city}
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
