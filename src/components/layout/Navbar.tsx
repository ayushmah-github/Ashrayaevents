"use client";

import { useEffect, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Show only near the very top of the page; hide once scrolled down and keep it
  // hidden (no reveal on scroll-up) until you return to the top.
  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 text-ink backdrop-blur-sm transition-transform duration-300 ease-out",
        "bg-gradient-to-b from-neutral-400/55 via-neutral-300/20 to-transparent",
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
