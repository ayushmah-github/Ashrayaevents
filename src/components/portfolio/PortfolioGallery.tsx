"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { portfolioCategories, type PortfolioItem } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Filterable portfolio gallery with a lightbox. `portfolio` is passed in from a
 * server component (fetched from Sanity, with fallback).
 */
export default function PortfolioGallery({
  portfolio,
  initialCategory = "All",
}: {
  portfolio: PortfolioItem[];
  initialCategory?: string;
}) {
  const [category, setCategory] = useState<string>(initialCategory);
  const [active, setActive] = useState<PortfolioItem | null>(null);

  const items =
    category === "All" ? portfolio : portfolio.filter((p) => p.category === category);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2">
        {portfolioCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-all",
              category === cat
                ? "bg-maroon text-cream"
                : "bg-white text-ink-soft hover:bg-sand hover:text-maroon",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.button
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={() => setActive(item)}
              className="group relative aspect-square overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <Image
                src={item.image}
                alt={`${item.title} — ${item.category} in ${item.location}`}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-maroon-dark/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                <div className="p-4 text-left text-cream">
                  <p className="font-serif text-lg">{item.title}</p>
                  <p className="text-xs text-cream/80">
                    {item.category} · {item.location}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-maroon-dark/90 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} enlarged`}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl">
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  sizes="90vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 text-center text-cream">
                <p className="font-serif text-2xl">{active.title}</p>
                <p className="text-sm text-cream/70">
                  {active.category} · {active.location}
                </p>
              </div>
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute -right-2 -top-12 flex h-10 w-10 items-center justify-center rounded-full bg-cream/10 text-cream hover:bg-cream/20"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
