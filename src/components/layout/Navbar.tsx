"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";
import Logo from "@/components/layout/Logo";

/**
 * Smart, flexible header: pinned to the top, solid crimson, and it auto-hides
 * when you scroll down and slides back in when you scroll up. Always visible at
 * the very top of the page and while the mobile menu is open.
 */
export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 10) {
        setHidden(false); // always show at the very top
      } else if (y > lastY.current && y > 120) {
        setHidden(true); // scrolling down
      } else if (y < lastY.current) {
        setHidden(false); // scrolling up
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-maroon text-cream shadow-[0_6px_24px_-14px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Logo className="text-cream" />

        {/* Desktop links — uppercase, spaced, right-aligned */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-xs font-medium uppercase tracking-[0.15em] text-cream/85 transition-colors hover:text-gold",
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
            className="overflow-hidden bg-maroon-dark lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 pb-6 pt-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-sm font-medium uppercase tracking-[0.12em] text-cream/90 hover:bg-maroon hover:text-gold"
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
