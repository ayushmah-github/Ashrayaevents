import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import CTASection from "@/components/sections/CTASection";
import { getServices } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Weddings, destination weddings, corporate events, private parties, décor & styling, catering and entertainment — full-service event planning by Ashraya Events.",
};

export default async function ServicesPage() {
  const services = await getServices();
  return (
    <>
      <PageHeader
        eyebrow="What we do"
        title="Our Services"
        intro="Full-service planning and design for every kind of celebration — tailored entirely to you."
      />

      {/* Alternating service rows, each anchored for footer/homepage deep links */}
      <Section tone="cream" className="pb-10">
        <div className="space-y-24">
          {services.map((service, i) => (
            <div
              key={service.slug}
              id={service.slug}
              className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2"
            >
              <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl2)] shadow-[var(--shadow-soft)]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delayIndex={1} className={i % 2 === 1 ? "lg:order-1" : ""}>
                <p className="eyebrow text-gold-dark">0{i + 1}</p>
                <h2 className="mt-3 text-3xl text-maroon sm:text-4xl">{service.title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                  {service.description}
                </p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-ink">
                      <span className="text-gold-dark">✦</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button href="/estimate" variant="outline">
                    Get an estimate
                  </Button>
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section tone="sand">
        <SectionHeading
          eyebrow="How we work"
          title="From first hello to the last dance"
          intro="A calm, transparent process that keeps you in the loop and stress-free."
        />
        <ProcessTimeline />
      </Section>

      <CTASection title="Not sure which service you need?" subtitle="Tell us about your event and we'll recommend the perfect approach." />
    </>
  );
}
