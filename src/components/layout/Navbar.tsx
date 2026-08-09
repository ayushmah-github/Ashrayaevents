"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";
import Logo from "@/components/layout/Logo";

/**
 * Shaandaar-style header: white logo + white uppercase links, fixed to the top
 * and always visible. Transparent (with a soft dark scrim) over the hero, and a
 * neutral dark bar once scrolled so the white text stays readable.
 */
export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Only visible at the very top of the page; hides as soon as you scroll.
  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 text-cream transition-transform duration-300 ease-out",
        open
          ? "bg-ink/95 backdrop-blur-md"
          : "bg-gradient-to-b from-black/50 via-black/15 to-transparent",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <nav className="flex w-full items-center justify-between px-6 py-4 sm:px-10 lg:px-14">
        <Logo className="text-cream" size="lg" showTagline={false} />

        {/* Desktop links */}
        <ul className="font-nav hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "inline-block text-[12px] font-medium uppercase tracking-[0.16em] text-cream/90 transition-colors hover:text-gold lg:text-[13px]",
                    active && "text-gold",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 text-cream lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className={cn("h-0.5 w-6 bg-current transition-all", open && "translate-y-2 rotate-45")} />
          <span className={cn("h-0.5 w-6 bg-current transition-all", open && "opacity-0")} />
          <span className={cn("h-0.5 w-6 bg-current transition-all", open && "-translate-y-2 -rotate-45")} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-ink/95 lg:hidden"
          >
            <ul className="font-nav flex flex-col gap-1 px-6 pb-6 pt-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-sm font-medium uppercase tracking-[0.12em] text-cream/90 hover:bg-white/10 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
