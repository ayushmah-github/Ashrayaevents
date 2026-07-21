"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials as allTestimonials, type Testimonial } from "@/lib/content";
import Stars from "@/components/shared/Stars";

/**
 * Auto-advancing testimonial carousel. Optionally accepts a filtered list
 * (used by the smart matching feature to surface relevant reviews).
 */
export default function TestimonialsCarousel({
  items = allTestimonials,
}: {
  items?: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const count = items.length;

  useEffect(() => {
    if (count <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(t);
  }, [count]);

  if (count === 0) return null;
  const t = items[index % count];

  return (
    <div className="mx-auto mt-14 max-w-3xl text-center">
      <div className="relative min-h-[15rem]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={t.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5 }}
          >
            <Stars count={t.rating} className="justify-center text-lg" />
            <p className="mt-6 font-serif text-2xl leading-relaxed text-cream sm:text-3xl">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-6 text-sm text-cream/70">
              <span className="font-semibold text-gold-light">{t.name}</span> · {t.event} ·{" "}
              {t.location}
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setIndex(i)}
            aria-label={`Show testimonial ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index % count ? "w-6 bg-gold" : "w-2 bg-cream/30 hover:bg-cream/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
