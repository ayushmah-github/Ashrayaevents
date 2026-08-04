import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import DecorationGallery from "@/components/store/DecorationGallery";
import FAQAccordion from "@/components/sections/FAQAccordion";
import DecorationCard from "@/components/store/DecorationCard";
import { getDecoration, getDecorations } from "@/lib/cms/store";
import { finalPrice } from "@/lib/store-data";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = await getDecoration(slug);
  if (!d) return { title: "Decoration not found" };
  return {
    title: d.title,
    description: d.description || `Book ${d.title} in ${d.city} with Ashraya Events.`,
    openGraph: { title: d.title, images: d.images.slice(0, 1) },
  };
}

export default async function DecorationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = await getDecoration(slug);
  if (!d) notFound();

  const price = finalPrice(d);
  const related = (await getDecorations({ category: d.category }))
    .filter((x) => x.slug !== d.slug)
    .slice(0, 4);

  const enquiry = whatsappLink(
    site.contact.whatsapp,
    `Hi Ashraya Events! I'd like to book "${d.title}" (${d.city}) — ₹${price.toLocaleString("en-IN")}.`,
  );

  return (
    <>
      <div className="pt-28 sm:pt-32">
        <Container size="wide">
          <Link href="/decorations" className="text-sm font-semibold text-gold-dark hover:text-maroon">
            ← Back to decorations
          </Link>

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            {/* Gallery */}
            <DecorationGallery images={d.images} title={d.title} />

            {/* Info + booking box */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">{d.category}</p>
              <h1 className="mt-2 font-serif text-4xl leading-tight text-maroon">{d.title}</h1>
              <p className="mt-2 text-ink-soft">
                {d.city}
                {d.area ? `, ${d.area}` : ""} {d.rating ? `· ★ ${d.rating}` : ""}
                {d.theme ? ` · ${d.theme}` : ""}
              </p>

              <div className="mt-5 flex items-baseline gap-3">
                <span className="font-serif text-3xl text-maroon">₹{price.toLocaleString("en-IN")}</span>
                {d.discount > 0 && (
                  <>
                    <span className="text-lg text-ink-soft line-through">
                      ₹{d.price.toLocaleString("en-IN")}
                    </span>
                    <span className="rounded-full bg-maroon/10 px-2.5 py-1 text-xs font-semibold text-maroon">
                      {d.discount}% off
                    </span>
                  </>
                )}
              </div>

              <p className="mt-2 text-sm text-ink-soft">
                {d.availability ? "✓ Available for booking" : "Currently unavailable"}
              </p>

              {d.description && <p className="mt-5 leading-relaxed text-ink-soft">{d.description}</p>}

              {/* Included items */}
              {d.includedItems.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">What&rsquo;s included</h3>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {d.includedItems.map((it) => (
                      <li key={it} className="flex items-center gap-2 text-sm text-ink">
                        <span className="text-gold-dark">✦</span> {it}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Add-ons */}
              {d.addons.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-ink">Optional add-ons</h3>
                  <ul className="mt-3 space-y-2">
                    {d.addons.map((a) => (
                      <li
                        key={a.name}
                        className="flex items-center justify-between rounded-xl bg-white px-4 py-2.5 text-sm shadow-[0_8px_30px_-24px_rgba(74,16,32,0.4)]"
                      >
                        <span className="text-ink">{a.name}</span>
                        <span className="font-semibold text-maroon">+₹{a.price.toLocaleString("en-IN")}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Booking CTA (enquiry — payment added in a later module) */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={enquiry}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  💬 Request this booking
                </a>
                <Button href="/contact" variant="outline">
                  Enquire
                </Button>
              </div>
            </div>
          </div>

          {/* FAQs */}
          {d.faqs.length > 0 && (
            <div className="mx-auto mt-16 max-w-3xl">
              <h2 className="text-center font-serif text-3xl text-maroon">Frequently asked questions</h2>
              <FAQAccordion faqs={d.faqs.map((f) => ({ q: f.question, a: f.answer }))} />
            </div>
          )}
        </Container>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <Section tone="sand" className="mt-16">
          <h2 className="font-serif text-3xl text-maroon">You may also like</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <DecorationCard key={r.id} d={r} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
