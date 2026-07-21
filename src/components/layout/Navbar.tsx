"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Logo from "@/components/layout/Logo";

/**
 * Shaandaar-style header: transparent over the home hero (with a soft top scrim
 * for legibility), turning solid crimson on scroll and on all inner pages.
 * White logo left, white uppercase links right.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Transparent (over image) only on the home hero before scrolling.
  const overHero = pathname === "/" && !scrolled && !open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 text-cream transition-all duration-500",
        overHero
          ? "bg-gradient-to-b from-black/55 via-black/20 to-transparent"
          : "bg-maroon shadow-[0_6px_24px_-14px_rgba(0,0,0,0.6)]",
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
          <li>
            <Button href="/estimate" variant="gold" size="md" className="uppercase tracking-[0.12em]">
              Enquire
            </Button>
          </li>
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
              <li className="mt-3 px-4">
                <Button href="/estimate" variant="gold" className="w-full uppercase tracking-[0.12em]" size="lg">
                  Enquire
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
