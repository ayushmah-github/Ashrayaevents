import Image from "next/image";
import { site } from "@/lib/site";
import { getPortfolio, getSiteSettings } from "@/lib/cms/content";
import InstagramEmbedPost from "@/components/shared/InstagramEmbedPost";

/**
 * Instagram feed section — genuinely live, no API key or login required.
 * Paste real post/reel URLs in admin (Site Settings → Instagram posts) and
 * they render as Meta's official interactive embed (real likes, real caption,
 * real profile picture — pulled live from Instagram on each page view).
 * Falls back to a widget embed URL, then to portfolio photos if neither is set.
 */
export default async function InstagramStrip() {
  const [settings, portfolio] = await Promise.all([getSiteSettings(), getPortfolio()]);
  const posts = settings.instagramPosts ?? [];
  const embed = settings.instagramEmbed || site.integrations.instagramEmbedSrc;

  return (
    <div className="mt-12">
      {posts.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.slice(0, 8).map((url) => (
            <InstagramEmbedPost key={url} url={url} />
          ))}
        </div>
      ) : embed ? (
        <div className="overflow-hidden rounded-[var(--radius-xl2)]">
          {/* Widget embed (SnapWidget/Behold/Elfsight) — see .env.example */}
          <iframe
            src={embed}
            title="Instagram feed"
            className="h-[420px] w-full border-0"
            loading="lazy"
          />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-2 opacity-90 sm:grid-cols-6 sm:gap-3">
            {/* [PLACEHOLDER] shown until real posts are added in the admin */}
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
          <p className="mt-4 text-center text-xs text-ink-soft">
            Not yet connected — paste real post links in{" "}
            <strong>Admin → Site Settings → Instagram posts</strong> to show the
            live feed here.
          </p>
        </div>
      )}
      <div className="mt-8 flex items-center justify-center gap-2">
        <InstagramGlyph className="h-4 w-4 text-maroon" />
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

function InstagramGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
