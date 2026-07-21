import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Brand logo. If `site.logoSrc` is set (e.g. "/logo.png"), the real artwork is
 * shown; otherwise an "A | E" serif monogram + wordmark is rendered, echoing the
 * Ashraya Events logo. The monogram uses `currentColor`, so set the text color
 * on/around it (ivory on the crimson navbar, ivory in the footer).
 */
export default function Logo({
  className,
  showWordmark = true,
  size = "md",
}: {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const letter = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-2xl";
  const word = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-xl";
  const rule = size === "lg" ? "h-7" : size === "sm" ? "h-4" : "h-5";
  const imgH = size === "lg" ? 72 : size === "sm" ? 40 : 52;

  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn("group inline-flex items-center gap-3", className)}
    >
      {site.logoSrc ? (
        <Image
          src={site.logoSrc}
          alt={site.name}
          height={imgH}
          width={imgH * 3}
          priority
          className="w-auto object-contain"
          style={{ height: imgH }}
        />
      ) : (
        <>
          {/* A | E monogram */}
          <span className={cn("flex items-center gap-1.5 font-serif leading-none", letter)}>
            <span>A</span>
            <span className={cn("w-px bg-current opacity-40", rule)} aria-hidden />
            <span>E</span>
          </span>
          {showWordmark && (
            <span className={cn("font-serif tracking-wide", word)}>Ashraya Events</span>
          )}
        </>
      )}
    </Link>
  );
}
