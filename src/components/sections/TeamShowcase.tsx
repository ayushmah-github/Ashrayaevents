"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { TeamMember } from "@/lib/cms/home";
import Reveal from "@/components/ui/Reveal";

/** Leadership/team profile cards; clicking one opens a bio modal with socials. */
export default function TeamShowcase({ team }: { team: TeamMember[] }) {
  const [active, setActive] = useState<TeamMember | null>(null);

  return (
    <>
      <div className="mx-auto mt-14 grid max-w-4xl gap-8 sm:grid-cols-2">
        {team.map((member, i) => (
          <Reveal key={member.name} delayIndex={i % 2} className="text-center">
            <button
              onClick={() => setActive(member)}
              className="group w-full focus-visible:outline-none"
              aria-haspopup="dialog"
            >
              <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-full shadow-[var(--shadow-soft)] transition-transform duration-300 group-hover:scale-[1.03]">
                <Image src={member.image} alt={member.name} fill sizes="192px" className="object-cover" />
              </div>
              <h3 className="mt-6 text-2xl text-maroon">{member.name}</h3>
              <p className="text-sm font-semibold uppercase tracking-wider text-gold-dark">
                {member.role}
              </p>
              <span className="mt-2 inline-block text-xs font-medium text-ink-soft underline-offset-2 group-hover:text-maroon group-hover:underline">
                Read bio
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Bio modal */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
              className="fixed inset-0 z-[80] bg-black/55 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[90] flex items-center justify-center p-4"
              role="dialog"
              aria-modal="true"
              aria-label={`${active.name} bio`}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md rounded-3xl bg-cream p-7 shadow-2xl sm:p-9"
              >
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-ink-soft hover:bg-sand hover:text-maroon"
                >
                  ✕
                </button>
                <div className="relative mx-auto aspect-square w-28 overflow-hidden rounded-full">
                  <Image src={active.image} alt={active.name} fill sizes="112px" className="object-cover" />
                </div>
                <p className="mt-5 text-center font-serif text-2xl text-maroon">{active.name}</p>
                <p className="text-center text-sm font-semibold uppercase tracking-wider text-gold-dark">
                  {active.role}
                </p>
                <p className="mt-4 text-center leading-relaxed text-ink-soft">{active.bio}</p>
                {active.linkedinUrl && (
                  <div className="mt-5 text-center">
                    <a
                      href={active.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-maroon hover:text-gold-dark"
                    >
                      Connect on LinkedIn ↗
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
