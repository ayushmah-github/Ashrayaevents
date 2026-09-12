import type { HowItWorksStep } from "@/lib/content";
import ValueIcon from "@/components/shared/ValueIcon";

/**
 * Horizontal step strip with real anchor links (`#slug`) — smooth-scrolls via
 * the site-wide `scroll-behavior: smooth`, no extra JS needed. Stacks
 * vertically on mobile.
 */
export default function StepNavigator({ steps }: { steps: HowItWorksStep[] }) {
  return (
    <nav aria-label="Planning steps" className="mt-10">
      <ol className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-2">
        {steps.map((step, i) => (
          <li key={step.slug} className="flex items-center gap-2">
            <a
              href={`#${step.slug}`}
              className="flex items-center gap-2 rounded-full border border-maroon/25 px-5 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:border-maroon hover:text-maroon"
            >
              <ValueIcon name={step.icon} className="h-4 w-4 text-gold-dark" />
              {step.navLabel || step.title}
            </a>
            {i < steps.length - 1 && (
              <span aria-hidden className="hidden text-maroon/30 sm:inline">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
