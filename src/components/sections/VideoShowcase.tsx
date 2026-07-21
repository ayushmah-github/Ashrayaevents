import Button from "@/components/ui/Button";

/**
 * Full-bleed silent background video with an overlay message.
 * Drop a muted showreel at /public/video/showreel.mp4 (and a poster at
 * /public/video/poster.jpg). Until then, the poster image fills the section.
 */
export default function VideoShowcase() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        // [PLACEHOLDER] add /public/video/showreel.mp4 + poster.jpg
        poster="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=2000&q=70&auto=format&fit=crop"
      >
        <source src="/video/showreel.mp4" type="video/mp4" />
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
