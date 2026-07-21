import { getTestimonials } from "@/lib/cms/content";
import Stars from "@/components/shared/Stars";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";

/**
 * Google-review styled cards. Uses the same testimonials data.
 * [PLACEHOLDER] point the "Read all reviews" link at the real Google listing.
 */
export default async function GoogleReviews({ limit = 6 }: { limit?: number }) {
  const testimonials = await getTestimonials();
  return (
    <div className="mt-12">
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold" style={{ color: "#4285F4" }}>G</span>
          <span className="font-serif text-2xl text-maroon">5.0</span>
          <Stars count={5} />
        </div>
        <p className="text-sm text-ink-soft">Loved by couples & clients on Google</p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.slice(0, limit).map((t, i) => (
          <Reveal key={t.id} delayIndex={i % 3}>
            <figure className="flex h-full flex-col rounded-[var(--radius-xl2)] bg-white p-6 shadow-[0_10px_40px_-28px_rgba(74,16,32,0.4)]">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-maroon/10 font-serif text-maroon">
                  {t.name[0]}
                </span>
                <div>
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-ink-soft">{t.event} · {t.location}</p>
                </div>
              </div>
              <Stars count={t.rating} className="mt-4" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </figure>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href={site.social.googleReviews}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-gold-dark hover:text-maroon"
        >
          Read all reviews on Google →
        </a>
      </div>
    </div>
  );
}
