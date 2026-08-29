"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/**
 * Counts up from 0 to the target value once it scrolls into view. Handles
 * values like "250", "5.0", "40" — any trailing non-digits (rare) pass through
 * untouched via `suffix`.
 */
export default function AnimatedStat({
  value,
  suffix = "",
  duration = 1.6,
}: {
  value: string;
  suffix?: string;
  duration?: number;
}) {
  const target = parseFloat(value) || 0;
  const decimals = value.includes(".") ? value.split(".")[1].length : 0;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay((target * eased).toFixed(decimals));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, decimals, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
    >
      {display}
      {suffix}
    </motion.span>
  );
}
