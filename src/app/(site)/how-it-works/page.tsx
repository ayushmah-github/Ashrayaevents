import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import CTASection from "@/components/sections/CTASection";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "How Ashraya Events plans your celebration — from first enquiry to flawless execution.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our process"
        title="How It Works"
        intro="A calm, transparent journey — from your first hello to the last farewell — so you stay stress-free while we handle every detail."
      />

      <Section tone="cream">
        <SectionHeading
          eyebrow="Step by step"
          title="From enquiry to celebration"
          intro="Here's exactly what to expect when you plan with us."
        />
        <ProcessTimeline />
      </Section>

      <CTASection title="Ready to begin your journey?" />
    </>
  );
}
