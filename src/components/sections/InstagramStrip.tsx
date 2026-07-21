import Image from "next/image";
import { site } from "@/lib/site";
import { portfolio } from "@/lib/content";

/**
 * Instagram feed section.
 * - If NEXT_PUBLIC_INSTAGRAM_EMBED_SRC is set (SnapWidget / Behold / Elfsight),
 *   we render that widget in an <iframe>.
 * - Otherwise we show a tasteful placeholder strip linking to the profile.
 */
export default function InstagramStrip() {
  const embed = site.integrations.instagramEmbedSrc;

  return (
    <div className="mt-12">
      {embed ? (
        <div className="overflow-hidden rounded-[var(--radius-xl2)]">
          {/* Embed widget from SnapWidget/Behold/Elfsight (see .env.example) */}
          <iframe
            src={embed}
            title="Instagram feed"
            className="h-[420px] w-full border-0"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
          {/* [PLACEHOLDER] replace with a real embed widget for the live @ashrayaevents feed */}
          {portfolio.slice(0, 6).map((item) => (
            <a
              key={item.id}
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={item.image}
                alt="Instagram post"
                fill
                sizes="(max-width: 640px) 33vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-maroon-dark/0 text-cream opacity-0 transition-all group-hover:bg-maroon-dark/40 group-hover:opacity-100">
                ⌾
              </div>
            </a>
          ))}
        </div>
      )}
      <div className="mt-8 text-center">
        <a
          href={site.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-gold-dark hover:text-maroon"
        >
          Follow us on Instagram {site.social.instagramHandle} →
        </a>
      </div>
    </div>
  );
}
