import Button from "@/components/ui/Button";
import { getSiteSettings } from "@/lib/cms/content";

const DEFAULT_POSTER =
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=2000&q=70&auto=format&fit=crop";

/**
 * Full-bleed silent background video with an overlay message. Poster + video
 * editable in admin (Site Settings → Film band poster / Hero video URL).
 */
export default async function VideoShowcase() {
  const settings = await getSiteSettings();
  const poster = settings.videoPoster || DEFAULT_POSTER;
  const videoSrc = settings.heroVideo || "/video/showreel.mp4";
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-maroon-dark/60" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center text-cream">
        <p className="eyebrow text-gold-light">Our celebrations, in motion</p>
        <h2 className="mt-5 text-4xl text-balance sm:text-5xl">
          Every frame, a memory made.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-cream/85">
          A glimpse of the emotion, colour and detail we bring to every event.
        </p>
        <div className="mt-8">
          <Button href="/portfolio" variant="gold" size="lg">
            Watch our stories
          </Button>
        </div>
      </div>
    </section>
  );
}
