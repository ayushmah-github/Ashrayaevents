"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";
import Logo from "@/components/layout/Logo";

/**
 * Frosted greyish-white header: translucent glass with a blur, more see-through
 * at the very top and a touch more solid once scrolled. Dark text. Auto-hides on
 * scroll-down and slides back in on scroll-up; always visible at the very top and
 * while the mobile menu is open.
 */
export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setAtTop(y < 10);
      if (y < 10) setHidden(false);
      else if (y > lastY.current && y > 120) setHidden(true);
      else if (y < lastY.current) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 text-ink backdrop-blur-md transition-all duration-300 ease-out",
        atTop && !open
          ? "bg-white/25"
          : "bg-white/85 shadow-[0_4px_22px_-14px_rgba(0,0,0,0.35)]",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-4 pl-2 pr-5 sm:pl-4 sm:pr-8">
        <Logo className="text-maroon" size="lg" showTagline={false} />

        {/* Desktop links */}
        <ul className="font-glacial hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink-soft transition-colors hover:text-gold-dark",
                    active && "text-gold-dark",
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
          className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 text-maroon lg:hidden"
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
            className="overflow-hidden bg-white/95 lg:hidden"
          >
            <ul className="font-glacial flex flex-col gap-1 px-5 pb-6 pt-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-xl px-4 py-3 text-sm font-medium uppercase tracking-[0.12em] text-ink-soft hover:bg-sand hover:text-maroon"
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
