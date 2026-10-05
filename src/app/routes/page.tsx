import type { Metadata } from "next";
import Link from "next/link";
import { cars, inr, rentalFare, rentalPackages } from "@/lib/site-data";
import RoutesView from "./RoutesView";

export const metadata: Metadata = {
  title: "Cab Routes and Fares from Vadodara",
  description: "One-way cab fares from Vadodara to Ahmedabad, Surat, Mumbai, Statue of Unity and more, plus local rental packages. No return charge.",
  alternates: { canonical: "/routes" },
};

export default function RoutesPage() {
  return (
    <RoutesView>
      <section id="local" aria-labelledby="local-h" className="mt-16 flex flex-col gap-4">
        <h2 id="local-h" className="h2-md">Local rental packages in Vadodara</h2>
        <p className="max-w-[640px] leading-[1.6]">Keep a car and driver for a few hours or the whole day. Extra hours and km are charged at a fixed rate shown when you book.</p>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
          {rentalPackages.map((p) => {
            const name = `${p.hours} hr / ${p.km} km`;
            return (
              <li key={p.hours} className="flex flex-col gap-3.5 rounded-2xl border border-line bg-white p-6">
                <h3 className="text-2xl font-bold tabular-nums text-ink">{name}</h3>
                <dl className="flex flex-col gap-2">
                  {cars.slice(0, 3).map((c) => (
                    <div key={c.id} className="flex justify-between gap-3 border-b border-[#F0F0F0] pb-2">
                      <dt>{c.name}</dt>
                      <dd className="font-bold tabular-nums text-ink">{inr(rentalFare(p.base, c))}</dd>
                    </div>
                  ))}
                </dl>
                <Link
                  href={`/booking?trip=rental&from=Vadodara&to=${encodeURIComponent(`Local ${p.hours} hr`)}`}
                  className="mt-auto flex h-12 items-center justify-center rounded-full bg-brand font-bold text-ink transition-colors hover:bg-brand-dark"
                >
                  Book {name} rental
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </RoutesView>
  );
}
