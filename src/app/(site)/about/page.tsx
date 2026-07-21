import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/layout/PageHeader";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import StatsBar from "@/components/sections/StatsBar";
import CTASection from "@/components/sections/CTASection";
import { values, team } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Ashraya Events — a wedding & event planning studio crafting warm, elegant, unforgettable celebrations.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="About Ashraya Events"
        intro="Planners at heart, storytellers by craft — here to make your celebration effortless and unforgettable."
      />

      {/* Story */}
      <Section tone="cream">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl2)] shadow-[var(--shadow-soft)]">
              {/* [PLACEHOLDER] founder / studio photo */}
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=70&auto=format&fit=crop"
                alt="Ashraya Events at work"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delayIndex={1}>
            <p className="eyebrow text-gold-dark">Who we are</p>
            <h2 className="mt-4 text-4xl text-maroon sm:text-5xl text-balance">
              A celebration should feel personal.
            </h2>
            {/* [PLACEHOLDER] real brand story / mission from the client */}
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                Ashraya Events was founded on the belief that no two celebrations
                should look the same. We start with your story — your people, your
                taste, your traditions — and design an experience around it.
              </p>
              <p>
                Over the years we&rsquo;ve planned weddings across cities and
                borders, corporate events for growing brands, and intimate parties
                that mean the world. Whatever the scale, our promise stays the
                same: thoughtful design, honest guidance and flawless execution.
              </p>
              <p className="font-serif text-2xl text-maroon">
                &ldquo;We plan, so you can simply celebrate.&rdquo;
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Stats */}
      <Section tone="sand" className="py-16 sm:py-20">
        <StatsBar />
      </Section>

      {/* Values */}
      <Section tone="cream">
        <SectionHeading
          eyebrow="Why choose us"
          title="What sets us apart"
          intro="The values that shape every celebration we touch."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delayIndex={i % 2}>
              <div className="flex gap-5 rounded-[var(--radius-xl2)] bg-white p-7 shadow-[0_10px_40px_-28px_rgba(74, 16, 32,0.4)]">
                <div className="mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gold/15 text-gold-dark">
                  ✦
                </div>
                <div>
                  <h3 className="text-xl text-maroon">{v.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink-soft">{v.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section tone="white">
        <SectionHeading
          eyebrow="The team"
          title="The people behind the magic"
          intro="[PLACEHOLDER] Add the real founder and team members, roles and short bios."
        />
        <div className="mx-auto mt-14 grid max-w-3xl gap-8 sm:grid-cols-2">
          {team.map((member, i) => (
            <Reveal key={member.name} delayIndex={i % 2} className="text-center">
              <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-full shadow-[var(--shadow-soft)]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="192px"
                  className="object-cover"
                />
              </div>
              <h3 className="mt-6 text-2xl text-maroon">{member.name}</h3>
              <p className="text-sm font-semibold uppercase tracking-wider text-gold-dark">
                {member.role}
              </p>
              <p className="mt-3 leading-relaxed text-ink-soft">{member.bio}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection title="Come celebrate with us." />
    </>
  );
}
