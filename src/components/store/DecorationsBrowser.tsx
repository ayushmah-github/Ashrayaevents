"use client";

import { useMemo, useState } from "react";
import type { Decoration, DecorationCategory, City } from "@/lib/store-data";
import DecorationCard from "./DecorationCard";

/** Search + filter (city / occasion / budget / theme) over decorations. */
export default function DecorationsBrowser({
  decorations,
  categories,
  cities,
  initialCategory = "",
  initialCity = "",
}: {
  decorations: Decoration[];
  categories: DecorationCategory[];
  cities: City[];
  initialCategory?: string;
  initialCity?: string;
}) {
  const [q, setQ] = useState("");
  const [city, setCity] = useState(initialCity);
  const [category, setCategory] = useState(initialCategory);
  const [maxBudget, setMaxBudget] = useState<number | "">("");

  const filtered = useMemo(() => {
    return decorations.filter((d) => {
      if (city && d.city.toLowerCase() !== city.toLowerCase()) return false;
      if (category && d.category !== category) return false;
      if (maxBudget !== "" && d.price > Number(maxBudget)) return false;
      if (q) {
        const n = q.toLowerCase();
        if (
          !d.title.toLowerCase().includes(n) &&
          !d.category.toLowerCase().includes(n) &&
          !(d.theme || "").toLowerCase().includes(n) &&
          !d.city.toLowerCase().includes(n)
        )
          return false;
      }
      return true;
    });
  }, [decorations, city, category, maxBudget, q]);

  const reset = () => {
    setQ("");
    setCity("");
    setCategory("");
    setMaxBudget("");
  };

  const sel = "rounded-xl border border-maroon/20 bg-white px-4 py-2.5 text-sm outline-none focus:border-gold";

  return (
    <div>
      {/* Filter bar */}
      <div className="rounded-[var(--radius-xl2)] bg-white p-5 shadow-[0_10px_40px_-30px_rgba(74,16,32,0.4)]">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <input
            className={sel}
            placeholder="Search decorations…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select className={sel} value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">All cities</option>
            {cities.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <select className={sel} value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All occasions</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            className={sel}
            value={maxBudget}
            onChange={(e) => setMaxBudget(e.target.value === "" ? "" : Number(e.target.value))}
          >
            <option value="">Any budget</option>
            <option value={2500}>Under ₹2,500</option>
            <option value={5000}>Under ₹5,000</option>
            <option value={10000}>Under ₹10,000</option>
            <option value={25000}>Under ₹25,000</option>
          </select>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-sm text-ink-soft">{filtered.length} decoration{filtered.length === 1 ? "" : "s"}</p>
          <button onClick={reset} className="text-sm font-semibold text-gold-dark hover:text-maroon">
            Clear filters
          </button>
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-ink-soft">
          No decorations match your filters. Try widening your search.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((d) => (
            <DecorationCard key={d.id} d={d} />
          ))}
        </div>
      )}
    </div>
  );
}
