import Image from "next/image";
import type { HowItWorksStep } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import ValueIcon from "@/components/shared/ValueIcon";
import CtaAction from "@/components/shared/CtaAction";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=70&auto=format&fit=crop";

/**
 * One step of the How It Works journey: a heading, then its content items
 * as alternating image/text rows (mirrors the Services page's row pattern),
 * ending in an optional pull-quote. Anchored by `id={step.slug}` for the
 * step navigator.
 */
export default function StepSection({ step, index }: { step: HowItWorksStep; index: number }) {
  return (
    <div id={step.slug} className="scroll-mt-28">
      <Reveal className="flex items-center gap-4">
        <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-gold/40 text-gold-dark">
          <ValueIcon name={step.icon} className="h-5 w-5" />
        </span>
        <div>
          <p className="eyebrow text-gold-dark">Step 0{index + 1}</p>
          <h2 className="text-3xl text-maroon sm:text-4xl">{step.title}</h2>
        </div>
      </Reveal>

      <div className="mt-10 space-y-16">
        {step.items.map((item, i) => (
          <div key={item.heading} className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl2)] shadow-[var(--shadow-soft)]">
                <Image
                  src={item.image || FALLBACK_IMAGE}
                  alt={item.heading}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delayIndex={1} className={i % 2 === 1 ? "lg:order-1" : ""}>
              <h3 className="text-2xl text-maroon">{item.heading}</h3>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">{item.body}</p>
              {item.ctaLabel && (
                <div className="mt-6">
                  <CtaAction
                    label={item.ctaLabel}
                    url={item.ctaUrl}
                    className="inline-flex items-center gap-2 rounded-full border border-maroon/40 px-6 py-2.5 text-sm font-semibold text-maroon transition-colors hover:bg-maroon hover:text-cream"
                  />
                </div>
              )}
            </Reveal>
          </div>
        ))}
      </div>

      {step.pullQuote && (
        <Reveal className="mt-14 text-center">
          <p className="mx-auto max-w-2xl font-serif text-2xl italic leading-snug text-maroon sm:text-3xl">
            &ldquo;{step.pullQuote}&rdquo;
          </p>
        </Reveal>
      )}
    </div>
  );
}
