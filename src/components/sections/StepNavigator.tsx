import type { HowItWorksStep } from "@/lib/content";
import ValueIcon from "@/components/shared/ValueIcon";

/**
 * Step navigator: circular icon badges connected by a thin line, with the
 * step label underneath — matches the reference site's clean, evenly-spaced
 * layout (no pill borders, no arrow separators). Real anchor links (`#slug`)
 * smooth-scroll via the site-wide `scroll-behavior: smooth`, no extra JS.
 * Renders inside a `tone="cream"` Section — the badge background must stay
 * `bg-cream` so the connecting line appears to pass behind each circle.
 */
export default function StepNavigator({ steps }: { steps: HowItWorksStep[] }) {
  return (
    <nav aria-label="Planning steps" className="mt-12">
      <ol className="mx-auto grid max-w-md grid-cols-2 gap-x-4 gap-y-10 sm:max-w-none sm:flex sm:items-start sm:justify-between sm:gap-2">
        {steps.map((step, i) => (
          <li key={step.slug} className="relative flex flex-1 flex-col items-center gap-3 text-center">
            {i < steps.length - 1 && (
              <span aria-hidden className="absolute left-1/2 top-6 hidden h-px w-full bg-maroon/15 sm:block" />
            )}
            <a href={`#${step.slug}`} className="group relative flex flex-col items-center gap-3">
              <span className="relative flex h-12 w-12 flex-none items-center justify-center rounded-full border border-maroon/25 bg-cream text-maroon transition-colors group-hover:border-maroon group-hover:bg-maroon group-hover:text-cream">
                <ValueIcon name={step.icon} className="h-5 w-5" />
              </span>
              <span className="max-w-[9rem] text-xs font-semibold uppercase tracking-wider text-ink-soft transition-colors group-hover:text-maroon">
                {step.navLabel || step.title}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
