import { processSteps } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";

/** "How we work" 4-step timeline. */
export default function ProcessTimeline() {
  return (
    <div className="mt-16 grid gap-8 md:grid-cols-4">
      {processSteps.map((step, i) => (
        <Reveal key={step.step} delayIndex={i} className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 font-serif text-xl text-gold-dark">
            {step.step}
          </div>
          {i < processSteps.length - 1 && (
            <div className="absolute left-14 top-7 hidden h-px w-[calc(100%-3.5rem)] bg-gradient-to-r from-gold/40 to-transparent md:block" />
          )}
          <h3 className="mt-5 text-xl text-maroon">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.description}</p>
        </Reveal>
      ))}
    </div>
  );
}
