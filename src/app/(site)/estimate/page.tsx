import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import Estimator from "@/components/estimate/Estimator";
import { getPortfolio, getTestimonials } from "@/lib/cms/content";
import { getPageBanner } from "@/lib/cms/home";

export const metadata: Metadata = {
  title: "Get an Estimate",
  description:
    "Answer a few quick questions and our AI planner will suggest a personalised package, style direction and budget range for your event.",
};

export const dynamic = "force-dynamic";

export default async function EstimatePage() {
  const [portfolio, testimonials, banner] = await Promise.all([
    getPortfolio(),
    getTestimonials(),
    getPageBanner("Estimate"),
  ]);
  return (
    <>
      <PageHeader
        eyebrow="Plan with AI"
        title={banner?.title || "Build your estimate"}
        intro={banner?.subtitle || "A few quick questions and our AI planner will suggest a package, a style direction and a budget range — instantly."}
        image={banner?.image}
      />
      <Section tone="cream" containerSize="narrow">
        <Estimator portfolio={portfolio} testimonials={testimonials} />
      </Section>
    </>
  );
}
