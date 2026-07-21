"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Full-bleed hero (Shaandaar-style): a bright wedding photograph is the star.
 * Slow crossfade slideshow, a soft top scrim for the transparent navbar, and a
 * gentle bottom vignette — no heavy overlay, no headline over the image.
 * [PLACEHOLDER] swap these for the client's best wide photos (or a <video>).
 */
const FALLBACK_SLIDES = [
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=2400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=2400&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=2400&q=80&auto=format&fit=crop",
];

export default function Hero({ images }: { images?: string[] }) {
  const SLIDES = images && images.length ? images : FALLBACK_SLIDES;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, [SLIDES.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4 }, scale: { duration: 7, ease: "linear" } }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[index]}
            alt="An elegant wedding celebration by Ashraya Events"
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Soft scrims only — keep the photo bright and dominant */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-maroon-dark/40 to-transparent" />

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Show slide ${i + 1}`}
            className={cn(
              "h-2 rounded-full transition-all",
              i === index ? "w-6 bg-gold" : "w-2 bg-cream/50 hover:bg-cream/80",
            )}
          />
        ))}
      </div>
    </section>
  );
}
