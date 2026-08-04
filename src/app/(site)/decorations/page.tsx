import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import DecorationsBrowser from "@/components/store/DecorationsBrowser";
import { getDecorations, getDecorationCategories, getCities } from "@/lib/cms/store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Book Decorations",
  description:
    "Book premium event decorations by Ashraya Events — birthdays, anniversaries, proposals, weddings and more. Search by city, occasion and budget.",
};

export default async function DecorationsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; city?: string }>;
}) {
  const { category = "", city = "" } = await searchParams;
  const [decorations, categories, cities] = await Promise.all([
    getDecorations(),
    getDecorationCategories(),
    getCities(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Decorations store"
        title="Book a decoration"
        intro="Beautiful, ready-to-book décor for every occasion — search by city, occasion and budget."
      />

      {/* Category strip */}
      <Section tone="cream" className="pb-6">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/decorations?category=${encodeURIComponent(c.name)}`}
              className="group flex w-28 flex-none flex-col items-center gap-2"
            >
              <div className="relative h-24 w-24 overflow-hidden rounded-full ring-1 ring-maroon/10">
                {c.image && (
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="96px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                )}
              </div>
              <span className="text-center text-xs font-medium text-ink-soft group-hover:text-maroon">
                {c.name.replace(" Decoration", "")}
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="sand" className="pt-6">
        <DecorationsBrowser
          decorations={decorations}
          categories={categories}
          cities={cities}
          initialCategory={category}
          initialCity={city}
        />
      </Section>
    </>
  );
}
