"use client";

import { useState } from "react";
import Stars from "@/components/Stars";
import { reviews, type Review } from "@/lib/site-data";

const FILTERS = ["All", "Outstation", "Airport", "Local"] as const;
type Filter = (typeof FILTERS)[number];

const kind = (r: Review): Filter => (/Airport/.test(r.route) ? "Airport" : /Local/.test(r.route) ? "Local" : "Outstation");

export default function ReviewsList() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = reviews.filter((r) => filter === "All" || kind(r) === filter);

  return (
    <>
      <div role="group" aria-label="Filter reviews" className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`h-11 rounded-[10px] border-[1.5px] px-[18px] text-sm font-semibold transition-colors ${filter === f ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"}`}
          >
            {f}
          </button>
        ))}
      </div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-4">
        {shown.map((r) => (
          <li key={r.name} className="flex flex-col gap-3.5 rounded-2xl border border-line bg-white p-6">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="grid size-11 flex-none place-items-center rounded-full bg-graphite font-bold text-white">{r.name[0]}</span>
              <span className="flex flex-col">
                <h2 className="font-bold text-ink">{r.name}</h2>
                <span className="text-[13px] text-muted">{r.city}</span>
              </span>
              <Stars rating={r.rating} className="ml-auto" />
            </div>
            <blockquote className="leading-[1.65] text-ink">“{r.text}”</blockquote>
            <span className="mt-auto self-start rounded-full bg-chip px-3 py-1.5 text-[13px] font-semibold text-graphite">{r.route}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
