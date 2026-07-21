"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Subtle scroll-entrance wrapper. Fades + rises children into view once.
 * Respects prefers-reduced-motion via the global CSS override.
 */
const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Reveal({
  children,
  className,
  delayIndex = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delayIndex?: number;
  as?: "div" | "li" | "span";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      custom={delayIndex}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </MotionTag>
  );
}
