"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Step } from "@/lib/cms/how-it-works";
import InquiryDrawer from "@/components/shared/InquiryDrawer";

/** Tabbed 4-step planning journey — click a step to see its phase cards. */
export default function ProcessJourney({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0);
  const current = steps[active];

  if (!current) return null;

  return (
    <div>
      {/* Step tabs */}
      <div className="flex flex-wrap justify-center gap-3">
        {steps.map((s, i) => (
          <button
            key={`${s.stepNumber}-${s.stepTitle}`}
            onClick={() => setActive(i)}
            className={`flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
              i === active
                ? "border-maroon bg-maroon text-cream"
                : "border-maroon/25 text-ink-soft hover:border-maroon hover:text-maroon"
            }`}
          >
            <span className="font-serif">{String(s.stepNumber).padStart(2, "0")}</span>
            {s.stepTitle}
          </button>
        ))}
      </div>

      {/* Phase cards for the active step */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          className="mt-10 grid gap-6 sm:grid-cols-2"
        >
          {current.phases.map((phase) => (
            <div
              key={phase.title}
              className="flex h-full flex-col rounded-[var(--radius-xl2)] bg-white p-7 shadow-[0_10px_40px_-28px_rgba(74,16,32,0.4)]"
            >
              <h3 className="text-xl text-maroon">{phase.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{phase.description}</p>
              {phase.ctaLabel && (
                <div className="mt-5">
                  <InquiryDrawer
                    triggerLabel={phase.ctaLabel}
                    triggerClassName="text-sm font-semibold text-gold-dark hover:text-maroon"
                  />
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
