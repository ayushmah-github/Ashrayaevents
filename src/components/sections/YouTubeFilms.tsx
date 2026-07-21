import { site } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";

/**
 * "Event Films" — embeds YouTube videos by ID (site.youtubeVideoIds).
 * Uses privacy-friendly youtube-nocookie. Swap in the client's real video IDs.
 */
export default function YouTubeFilms({ limit = 3 }: { limit?: number }) {
  const ids = site.youtubeVideoIds.slice(0, limit);
  return (
    <div className="mt-14 grid gap-6 md:grid-cols-3">
      {ids.map((id, i) => (
        <Reveal key={id} delayIndex={i % 3} as="div">
          <div className="overflow-hidden rounded-[var(--radius-xl2)] bg-maroon-dark shadow-[var(--shadow-soft)]">
            <div className="relative aspect-video">
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${id}`}
                title={`${site.name} event film`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
