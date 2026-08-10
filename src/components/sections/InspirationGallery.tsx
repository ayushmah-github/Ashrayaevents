"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { InspirationTab } from "@/lib/content";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

// Bento pattern (per row of 4 columns): big top-left, then a wide bottom-centre.
const SPANS = ["sm:col-span-2", "", "", "", "sm:col-span-2", ""];

/** "Inspiration for Wedding Frames" — tabbed bento gallery (tabs from the admin). */
export default function InspirationGallery({ inspirationTabs }: { inspirationTabs: InspirationTab[] }) {
  const [active, setActive] = useState(0);
  const frames = inspirationTabs[active]?.frames ?? [];

  return (
    <section className="bg-cream py-20 sm:py-28">
      <Container size="wide">
        <SectionHeading
          eyebrow="Give your day a new look"
          title="Inspiration for Wedding Frames"
        />

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {inspirationTabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActive(i)}
              className={`rounded-xl border px-6 py-2.5 text-sm font-medium transition-all ${
                i === active
                  ? "border-maroon bg-maroon text-cream"
                  : "border-maroon/25 text-ink-soft hover:border-maroon hover:text-maroon"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Frames */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="mt-10 grid grid-cols-2 gap-3 sm:auto-rows-[15rem] sm:grid-cols-4 sm:gap-4 lg:auto-rows-[17rem]"
          >
            {frames.map((f, i) => (
              <div
                key={`${f.title}-${i}`}
                className={cn(
                  "group relative h-52 overflow-hidden rounded-2xl sm:h-auto",
                  SPANS[i % SPANS.length],
                )}
              >
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  sizes="(max-width: 640px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-md bg-black/70 px-3 py-1.5 text-xs font-medium text-white sm:text-sm">
                  {f.title}
                </span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
