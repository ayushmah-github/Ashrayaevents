import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Brand logo — a signature-script "Ashraya Events" wordmark with the tagline
 * beneath (echoing the real logo). Uses `currentColor`, so set the text color
 * on/around it (ivory on the crimson navbar, ivory in the footer).
 *
 * If `site.logoSrc` is set (e.g. "/logo.png"), the real artwork image is shown.
 *
 * FONT: the wordmark uses `font-signature` (currently Allura — the closest free
 * match to "Madelyn"). To use real Madelyn, drop the font file in and switch the
 * `--font-allura` definition in layout.tsx to next/font/local. See README.
 */
export default function Logo({
  className,
  showTagline = true,
  size = "md",
}: {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const word = size === "lg" ? "text-5xl" : size === "sm" ? "text-3xl" : "text-4xl";
  const tag = size === "lg" ? "text-[0.65rem]" : "text-[0.55rem]";
  const imgH = size === "lg" ? 76 : size === "sm" ? 44 : 56;

  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn("group inline-flex items-center", className)}
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
        <span className="flex flex-col items-center leading-none">
          <span className={cn("font-signature", word)}>Ashraya Events</span>
          {showTagline && (
            <span className={cn("mt-1 font-sans uppercase tracking-[0.35em]", tag)}>
              A home for your events
            </span>
          )}
        </span>
      )}
    </Link>
  );
}
