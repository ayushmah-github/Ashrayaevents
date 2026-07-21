"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

const CATEGORIES = ["Weddings", "Destination", "Corporate", "Birthday", "Décor", "Tips"];

/** Internal AI drafting tool — notes in, polished blog draft out. */
export default function BlogAssistant() {
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function generate() {
    if (!notes.trim() || loading) return;
    setLoading(true);
    setDraft("");
    try {
      const res = await fetch("/api/blog-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes, category }),
      });
      const data = await res.json();
      setDraft(data.draft || data.error || "No draft returned.");
    } catch {
      setDraft("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[var(--radius-xl2)] bg-white p-6 shadow-[0_10px_40px_-28px_rgba(74, 16, 32,0.4)]">
        <label className="mb-1.5 block text-sm font-medium text-ink">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mb-4 w-full rounded-xl border border-maroon/20 bg-cream/40 px-4 py-3 text-sm outline-none focus:border-gold"
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <label className="mb-1.5 block text-sm font-medium text-ink">Your notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={7}
          placeholder="e.g. Beach wedding in Goa, 180 guests, marigold + white palette, live sitar during vows, sunset baraat, couple wanted zero-stress planning…"
          className="w-full rounded-xl border border-maroon/20 bg-cream/40 px-4 py-3 text-sm outline-none focus:border-gold"
        />
        <div className="mt-4">
          <Button onClick={generate} disabled={loading || !notes.trim()}>
            {loading ? "Drafting…" : "Generate draft"}
          </Button>
        </div>
      </div>

      {draft && (
        <div className="rounded-[var(--radius-xl2)] bg-white p-6 shadow-[0_10px_40px_-28px_rgba(74, 16, 32,0.4)]">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-maroon">Draft (Markdown)</h2>
            <button onClick={copy} className="text-sm font-semibold text-gold-dark hover:text-maroon">
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap rounded-xl bg-sand p-4 text-sm leading-relaxed text-ink">
            {draft}
          </pre>
        </div>
      )}
    </div>
  );
}
