import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Estimator from "@/components/estimate/Estimator";
import { getPortfolio, getTestimonials } from "@/lib/cms/content";

export const metadata: Metadata = {
  title: "Get an Estimate",
  description:
    "Answer a few quick questions and our AI planner will suggest a personalised package, style direction and budget range for your event.",
};

export default async function EstimatePage() {
  const [portfolio, testimonials] = await Promise.all([getPortfolio(), getTestimonials()]);
  return (
    <>
      <PageHeader
        eyebrow="Plan with AI"
        title="Build your estimate"
        intro="A few quick questions and our AI planner will suggest a package, a style direction and a budget range — instantly."
      />
      <Section tone="cream" containerSize="narrow">
        <Estimator portfolio={portfolio} testimonials={testimonials} />
      </Section>
    </>
  );
}
