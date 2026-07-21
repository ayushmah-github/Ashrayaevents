"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Expandable FAQ list. `faqs` is passed in from a server component (Sanity). */
export default function FAQAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto mt-14 max-w-3xl">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={faq.q} className="border-b border-maroon/10">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-xl text-maroon">{faq.q}</span>
              <span
                className={`flex h-8 w-8 flex-none items-center justify-center rounded-full border border-gold/40 text-gold-dark transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 leading-relaxed text-ink-soft">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
