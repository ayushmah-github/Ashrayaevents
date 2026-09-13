import type { HowItWorksStep } from "@/lib/content";
import ValueIcon from "@/components/shared/ValueIcon";

/**
 * Step navigator: a large soft-tint circle around a line icon, with a bold
 * label underneath — matches the reference site's clean, evenly-spaced row
 * (no pill borders, no connecting lines). Real anchor links (`#slug`)
 * smooth-scroll via the site-wide `scroll-behavior: smooth`, no extra JS.
 */
export default function StepNavigator({ steps }: { steps: HowItWorksStep[] }) {
  return (
    <nav aria-label="Planning steps" className="mt-12">
      <ol className="mx-auto flex max-w-3xl flex-wrap items-start justify-center gap-x-10 gap-y-10 sm:flex-nowrap sm:justify-between">
        {steps.map((step) => (
          <li key={step.slug} className="flex w-28 flex-none flex-col items-center gap-4 sm:w-auto">
            <a href={`#${step.slug}`} className="group flex flex-col items-center gap-4">
              <span className="flex h-24 w-24 flex-none items-center justify-center rounded-full bg-gold/10 text-maroon transition-colors group-hover:bg-gold/20 sm:h-28 sm:w-28">
                <ValueIcon name={step.icon} className="h-10 w-10 sm:h-11 sm:w-11" />
              </span>
              <span className="text-sm font-semibold text-ink sm:text-base">
                {step.navLabel || step.title}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
