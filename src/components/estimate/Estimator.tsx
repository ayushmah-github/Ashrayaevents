"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Stars from "@/components/shared/Stars";
import {
  portfolio as fallbackPortfolio,
  testimonials as fallbackTestimonials,
  type PortfolioItem,
  type Testimonial,
} from "@/lib/content";
import { site } from "@/lib/site";
import type { EstimateResult } from "@/app/api/estimate/route";

/* ---- Step definitions ------------------------------------------------------ */
type StepKey =
  | "eventType"
  | "guestCount"
  | "city"
  | "style"
  | "mustHaves"
  | "budgetRange"
  | "contact";

type Step = {
  key: StepKey;
  question: string;
  helper?: string;
  options?: string[];
  freeText?: boolean;
};

const STEPS: Step[] = [
  {
    key: "eventType",
    question: "What are we celebrating?",
    options: ["Wedding", "Destination Wedding", "Corporate Event", "Birthday / Party", "Other"],
  },
  {
    key: "guestCount",
    question: "Roughly how many guests?",
    options: ["Under 50", "50–150", "150–350", "350–700", "700+"],
  },
  {
    key: "city",
    question: "Which city or destination?",
    helper: "Type a city, or a dream location for a destination event.",
    freeText: true,
  },
  {
    key: "style",
    question: "What style are you drawn to?",
    options: ["Classic & elegant", "Modern & minimal", "Royal & grand", "Boho & natural", "Fun & vibrant"],
  },
  {
    key: "mustHaves",
    question: "Any must-haves?",
    helper: "e.g. live band, specific cuisine, floral mandap, fireworks…",
    freeText: true,
  },
  {
    key: "budgetRange",
    question: "What budget range feels right?",
    options: ["Flexible", "Under ₹5L", "₹5–15L", "₹15–40L", "₹40L+"],
  },
];

type Answers = Partial<Record<StepKey, string>> & {
  name?: string;
  contact?: string;
  eventDate?: string;
};

export default function Estimator({
  portfolio = fallbackPortfolio,
  testimonials = fallbackTestimonials,
}: {
  portfolio?: PortfolioItem[];
  testimonials?: Testimonial[];
} = {}) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [freeInput, setFreeInput] = useState("");

  const isContactStep = stepIndex === STEPS.length;
  const step = STEPS[stepIndex];
  const progress = Math.round((stepIndex / (STEPS.length + 1)) * 100);

  function choose(key: StepKey, value: string) {
    setAnswers((a) => ({ ...a, [key]: value }));
    setFreeInput("");
    setStepIndex((i) => i + 1);
  }

  function submitFreeText() {
    if (!step?.freeText) return;
    choose(step.key, freeInput.trim() || "No preference");
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const contactAnswers = {
      name: String(form.get("name") || ""),
      contact: String(form.get("contact") || ""),
      eventDate: String(form.get("eventDate") || ""),
    };
    const full = { ...answers, ...contactAnswers };
    setAnswers(full);
    setLoading(true);
    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(full),
      });
      const data = (await res.json()) as EstimateResult;
      setResult(data);

      // Forward the estimate as a lead to Formspree (best-effort).
      if (site.integrations.formspreeEndpoint) {
        fetch(site.integrations.formspreeEndpoint, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({
            _subject: `New estimate request — ${full.eventType} (${full.name})`,
            ...full,
            ai_estimate: data,
          }),
        }).catch(() => {});
      }
    } catch {
      /* handled by result stay null -> show retry */
    } finally {
      setLoading(false);
    }
  }

  /* ---- Result view --------------------------------------------------------- */
  if (result) {
    const cats = result.matchedCategories?.length ? result.matchedCategories : ["Wedding"];
    const matchedEvents = portfolio.filter((p) => cats.includes(p.category)).slice(0, 3);
    const matchedTestimonials = testimonials
      .filter((t) =>
        cats.some((c) => t.event.toLowerCase().includes(c.toLowerCase())),
      )
      .slice(0, 2);

    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="rounded-[var(--radius-xl2)] bg-white p-8 shadow-[var(--shadow-soft)] sm:p-10">
          <p className="eyebrow text-gold-dark">Your personalised estimate</p>
          <h2 className="mt-3 font-serif text-3xl text-maroon sm:text-4xl">
            {result.recommendedPackage}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{result.message}</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-sand p-6">
              <p className="text-xs uppercase tracking-wider text-ink-soft">Estimated range</p>
              <p className="mt-2 font-serif text-2xl text-maroon">{result.priceRange}</p>
            </div>
            <div className="rounded-2xl bg-sage/60 p-6">
              <p className="text-xs uppercase tracking-wider text-ink-soft">Style direction</p>
              <p className="mt-2 text-sm leading-relaxed text-ink">{result.styleDirection}</p>
            </div>
          </div>

          {result.inclusions?.length > 0 && (
            <div className="mt-6">
              <p className="text-xs uppercase tracking-wider text-ink-soft">Typical inclusions</p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {result.inclusions.map((inc) => (
                  <li key={inc} className="flex items-center gap-2 text-sm text-ink">
                    <span className="text-gold-dark">✦</span> {inc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/contact" variant="primary">
              Book a free consultation
            </Button>
            <Button variant="ghost" onClick={() => { setResult(null); setStepIndex(0); setAnswers({}); }}>
              Start over
            </Button>
          </div>
          <p className="mt-4 text-xs text-ink-soft">
            This is an AI-generated indication to help you plan — your final quote is
            tailored by our team. We&rsquo;ve saved your details and will reach out.
          </p>
        </div>

        {/* Smart-matched portfolio */}
        {matchedEvents.length > 0 && (
          <div>
            <h3 className="text-2xl text-maroon">Events like yours</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {matchedEvents.map((item) => (
                <Link
                  key={item.id}
                  href="/portfolio"
                  className="group relative aspect-square overflow-hidden rounded-2xl"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-maroon-dark/70 to-transparent p-3 text-cream opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="text-xs">{item.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Smart-matched testimonials */}
        {matchedTestimonials.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {matchedTestimonials.map((t) => (
              <figure key={t.id} className="rounded-2xl bg-white p-6 shadow-[0_10px_40px_-28px_rgba(74, 16, 32,0.4)]">
                <Stars count={t.rating} />
                <blockquote className="mt-3 text-sm leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-xs text-ink-soft">
                  {t.name} · {t.event}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </motion.div>
    );
  }

  /* ---- Question flow ------------------------------------------------------- */
  return (
    <div className="rounded-[var(--radius-xl2)] bg-white p-7 shadow-[var(--shadow-soft)] sm:p-10">
      {/* Progress */}
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-sand">
        <motion.div
          className="h-full rounded-full bg-gold"
          animate={{ width: `${loading ? 100 : progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-16 text-center"
          >
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-gold border-t-transparent" />
            <p className="mt-6 font-serif text-2xl text-maroon">Crafting your estimate…</p>
            <p className="mt-2 text-sm text-ink-soft">Our AI planner is putting together a personalised plan.</p>
          </motion.div>
        ) : isContactStep ? (
          <motion.form
            key="contact"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            onSubmit={submit}
          >
            <p className="eyebrow text-gold-dark">Almost there</p>
            <h2 className="mt-3 font-serif text-3xl text-maroon">Where should we send it?</h2>
            <p className="mt-2 text-ink-soft">We&rsquo;ll show your estimate now and follow up personally.</p>
            <div className="mt-6 grid gap-4">
              <input name="name" required placeholder="Your name" className="rounded-xl border border-maroon/20 bg-cream/40 px-4 py-3 text-sm outline-none focus:border-gold" />
              <input name="contact" required placeholder="Phone or email" className="rounded-xl border border-maroon/20 bg-cream/40 px-4 py-3 text-sm outline-none focus:border-gold" />
              <input name="eventDate" type="date" className="rounded-xl border border-maroon/20 bg-cream/40 px-4 py-3 text-sm text-ink-soft outline-none focus:border-gold" />
            </div>
            <div className="mt-7 flex items-center gap-3">
              <Button type="submit" size="lg">See my estimate</Button>
              <button type="button" onClick={() => setStepIndex((i) => i - 1)} className="text-sm text-ink-soft hover:text-maroon">
                ← Back
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key={step.key}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
          >
            <p className="text-sm text-ink-soft">
              Step {stepIndex + 1} of {STEPS.length + 1}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-maroon sm:text-4xl">{step.question}</h2>
            {step.helper && <p className="mt-2 text-ink-soft">{step.helper}</p>}

            {step.freeText ? (
              <div className="mt-6">
                <input
                  autoFocus
                  value={freeInput}
                  onChange={(e) => setFreeInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submitFreeText()}
                  placeholder="Type your answer…"
                  className="w-full rounded-xl border border-maroon/20 bg-cream/40 px-4 py-3 outline-none focus:border-gold"
                />
                <div className="mt-5 flex items-center gap-3">
                  <Button onClick={submitFreeText}>Continue</Button>
                  {stepIndex > 0 && (
                    <button onClick={() => setStepIndex((i) => i - 1)} className="text-sm text-ink-soft hover:text-maroon">
                      ← Back
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {step.options!.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => choose(step.key, opt)}
                      className="rounded-2xl border border-maroon/15 bg-cream/40 px-5 py-4 text-left text-ink transition-all hover:border-gold hover:bg-sand hover:shadow-sm"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                {stepIndex > 0 && (
                  <button onClick={() => setStepIndex((i) => i - 1)} className="mt-5 text-sm text-ink-soft hover:text-maroon">
                    ← Back
                  </button>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
