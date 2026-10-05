import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Stars from "@/components/Stars";
import { rating } from "@/lib/site-data";
import ReviewsList from "./ReviewsList";

export const metadata: Metadata = {
  title: "The Quick Cab Reviews | Vadodara Cab Service",
  description: "What families, business travellers and airport passengers say about their trips with The Quick Cab.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Reviews" }]}>
        <header className="flex flex-wrap items-end justify-between gap-6 pb-8 pt-6">
          <div className="flex max-w-[640px] flex-col gap-3.5">
            <h1 className="h1-page">Reviews from Quick Cab riders</h1>
            <p className="text-[17px] leading-[1.6]">Families, business travellers and airport passengers on their trips with us.</p>
          </div>
          <div className="glass flex items-center gap-4 rounded-2xl px-[22px] py-[18px]">
            <span className="text-[40px] font-bold leading-none tabular-nums text-white">{rating.value}</span>
            <span className="flex flex-col gap-1">
              <Stars size={18} label={rating.label} />
              <span className="text-[13px] text-mist">Average rider rating</span>
            </span>
          </div>
        </header>
      </PageHero>
      <main id="main" className="wrap pb-[clamp(56px,8vw,96px)] pt-10">
        <ReviewsList />
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white p-6">
          <h2 className="text-xl font-bold text-ink">Travelled with us?</h2>
          <div className="flex flex-wrap gap-2.5">
            <a href="#google-review" className="flex h-12 items-center rounded-[10px] border-[1.5px] border-ink px-5 font-semibold text-ink transition-colors hover:bg-ink hover:text-white">Write a review on Google</a>
            <Link href="/#booking-card" className="flex h-12 items-center rounded-[10px] bg-brand px-[22px] font-bold text-ink transition-colors hover:bg-brand-dark">Check Fare</Link>
          </div>
        </div>
      </main>
    </>
  );
}
