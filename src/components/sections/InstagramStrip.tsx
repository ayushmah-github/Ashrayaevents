import Image from "next/image";
import { site } from "@/lib/site";
import { getPortfolio, getSiteSettings } from "@/lib/cms/content";
import { instagramEmbedUrl } from "@/lib/utils";

/**
 * Instagram feed section. Paste post/reel links in admin (Site Settings →
 * Instagram posts) to embed them; or a widget URL; otherwise portfolio photos.
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
            <div
              key={url}
              className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_-30px_rgba(74,16,32,0.4)]"
            >
              <iframe
                src={instagramEmbedUrl(url)}
                title="Instagram post"
                className="h-[500px] w-full border-0"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      ) : embed ? (
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
