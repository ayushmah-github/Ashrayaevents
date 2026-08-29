"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ContactForm from "@/components/contact/ContactForm";

/**
 * Slide-in inquiry drawer — lets a CTA button open the contact form in place,
 * without navigating away from the page. Renders its own trigger button.
 */
export default function InquiryDrawer({
  triggerLabel = "Plan Your Event",
  triggerClassName,
}: {
  triggerLabel?: string;
  triggerClassName: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className={triggerClassName}>
        {triggerLabel}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-[90] w-full max-w-md overflow-y-auto bg-cream p-6 shadow-2xl sm:p-8"
              role="dialog"
              aria-modal="true"
              aria-label="Send an enquiry"
            >
              <div className="flex items-center justify-between">
                <p className="font-serif text-2xl text-maroon">Tell us about your event</p>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:bg-sand hover:text-maroon"
                >
                  ✕
                </button>
              </div>
              <p className="mt-2 text-sm text-ink-soft">
                Share a few details and our team will reach out shortly.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
