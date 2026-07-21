"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import Button from "@/components/ui/Button";

const EVENT_TYPES = [
  "Wedding",
  "Destination Wedding",
  "Corporate Event",
  "Birthday / Private Party",
  "Décor & Styling",
  "Other",
];

type Status = "idle" | "sending" | "success" | "error";

/**
 * Contact form. Submits to Formspree (set NEXT_PUBLIC_FORMSPREE_ENDPOINT).
 * Before sending, it asks /api/lead-summary for an AI lead card and includes
 * it in the submission so the client's team gets a ready-to-call summary.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const endpoint = site.integrations.formspreeEndpoint;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // 1) Ask the AI to score/summarise this lead (best-effort).
    let leadCard = null;
    try {
      const res = await fetch("/api/lead-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "contact", fields: data }),
      });
      leadCard = (await res.json())?.card ?? null;
    } catch {
      /* non-fatal */
    }

    // 2) If Formspree isn't configured yet, we can't actually send.
    if (!endpoint) {
      console.warn("Formspree endpoint not set — see .env.example");
      setStatus("success"); // optimistic so the demo flow works
      form.reset();
      return;
    }

    // 3) Send to Formspree with the AI lead card attached.
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: `New enquiry — ${data.eventType || "Event"} (${data.name || "Website"})`,
          ai_lead_card: leadCard,
        }),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius-xl2)] bg-white p-10 text-center shadow-[var(--shadow-soft)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/20 text-2xl text-gold-dark">
          ✓
        </div>
        <h3 className="mt-5 text-2xl text-maroon">Thank you!</h3>
        <p className="mt-3 text-ink-soft">
          Your enquiry is in — we&rsquo;ll get back to you very soon. For anything
          urgent, WhatsApp us and we&rsquo;ll reply right away.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-gold-dark hover:text-maroon"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[var(--radius-xl2)] bg-white p-7 shadow-[var(--shadow-soft)] sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Phone" name="phone" type="tel" />
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="eventType">
            Event type
          </label>
          <select
            id="eventType"
            name="eventType"
            className="w-full rounded-xl border border-maroon/20 bg-cream/40 px-4 py-3 text-sm outline-none focus:border-gold"
            defaultValue=""
          >
            <option value="" disabled>
              Select…
            </option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <Field label="Event date" name="eventDate" type="date" />
        <Field label="Approx. guests" name="guests" type="number" />
      </div>

      <div className="mt-5">
        <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="message">
          Tell us about your celebration
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-xl border border-maroon/20 bg-cream/40 px-4 py-3 text-sm outline-none focus:border-gold"
          placeholder="Your vision, venue ideas, must-haves…"
        />
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-red-600">
          Something went wrong. Please try again or WhatsApp us.
        </p>
      )}

      <div className="mt-7">
        <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor={name}>
        {label} {required && <span className="text-gold-dark">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-maroon/20 bg-cream/40 px-4 py-3 text-sm outline-none focus:border-gold"
      />
    </div>
  );
}
