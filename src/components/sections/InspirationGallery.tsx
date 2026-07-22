"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { inspirationTabs } from "@/lib/content";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

/** "Inspiration for Wedding Frames" — tabbed, captioned décor gallery. */
export default function InspirationGallery() {
  const [active, setActive] = useState(0);
  const frames = inspirationTabs[active].frames;

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
            className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {frames.map((f) => (
              <div key={f.title} className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-maroon-dark/80 to-transparent p-4">
                  <span className="rounded-md bg-maroon-dark/60 px-3 py-1 text-sm font-medium text-cream">
                    {f.title}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
