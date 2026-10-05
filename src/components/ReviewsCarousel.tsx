"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { rating, reviews } from "@/lib/site-data";
import Stars from "./Stars";

export default function ReviewsCarousel() {
  const list = useRef<HTMLUListElement>(null);
  const scroll = (dir: number) => {
    const el = list.current;
    if (el) el.scrollBy({ left: dir * Math.min(380, el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <div className="wrap">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-col gap-3">
          <span className="eyebrow">Reviews</span>
          <h2 id="rev-h" className="h2-xl">What riders say</h2>
          <span className="flex items-center gap-2.5 text-[15px]">
            <strong className="text-[22px] font-bold text-ink">{rating.value}</strong>
            <Stars label={rating.label} />
            <span className="text-muted">average rider rating</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/reviews" className="link mr-2 flex min-h-11 items-center font-semibold">All reviews</Link>
          <button type="button" aria-label="Previous reviews" onClick={() => scroll(-1)} className="grid size-12 place-items-center rounded-full border-[1.5px] border-ink bg-white text-ink transition-colors hover:bg-ink hover:text-white">
            <ArrowLeft size={18} />
          </button>
          <button type="button" aria-label="Next reviews" onClick={() => scroll(1)} className="grid size-12 place-items-center rounded-full bg-ink text-white transition-colors hover:bg-graphite">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <ul ref={list} className="no-scrollbar -mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-6 pt-2">
        {reviews.map((r) => (
          <li key={r.name} className="flex flex-[0_0_min(360px,84%)] snap-start flex-col gap-4 rounded-3xl border border-line bg-page p-7">
            <span className="flex items-center justify-between">
              <Stars rating={r.rating} size={17} />
              <span aria-hidden="true" className="h-7 text-[56px] font-bold leading-[0.6] text-brand">“</span>
            </span>
            <blockquote className="text-pretty text-[17px] leading-[1.6] text-ink">{r.text}</blockquote>
            <div className="mt-auto flex items-center gap-3 border-t border-line pt-4">
              <span aria-hidden="true" className="grid size-[42px] place-items-center rounded-full bg-ink font-bold text-brand">{r.name[0]}</span>
              <span className="flex flex-col text-sm">
                <strong className="text-ink">{r.name}, {r.city}</strong>
                <span className="text-muted">{r.route}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
