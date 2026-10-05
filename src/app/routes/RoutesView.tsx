"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { ArrowRight, Search } from "lucide-react";
import PageHero from "@/components/PageHero";
import { cars, contact, inr, routes } from "@/lib/site-data";

const [hatch, , suv] = cars;

/** Hero search and the outstation table share the query, so they live in one client component. */
export default function RoutesView({ children }: { children: ReactNode }) {
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const rows = routes.filter((r) => !term || r.to.toLowerCase().includes(term));

  return (
    <>
      <PageHero crumbs={[{ label: "Routes & Fares" }]}>
        <header className="flex flex-wrap items-end justify-between gap-6 pb-8 pt-6">
          <div className="flex max-w-[680px] flex-col gap-3.5">
            <h1 className="h1-page">Cab routes and fares from Vadodara</h1>
            <p className="text-[17px] leading-[1.6]">One-way starting fares by car type. Every fare covers your trip only, with no return charge.</p>
          </div>
          <div className="flex w-[min(100%,340px)] flex-col gap-1.5">
            <label htmlFor="route-search" className="text-sm font-semibold text-white">Find a route</label>
            <div className="relative">
              <Search size={20} className="pointer-events-none absolute left-3.5 top-4 text-muted" />
              <input id="route-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. Surat" className="qc-input pl-11" />
            </div>
          </div>
        </header>
      </PageHero>

      <main id="main" className="wrap pb-[clamp(56px,8vw,96px)] pt-12">
        <section aria-labelledby="out-h" className="flex flex-col gap-4">
          <h2 id="out-h" className="h2-md">Outstation one-way fares</h2>
          <div className="relative overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="qc-table min-w-[720px]">
              <caption>Starting fares in INR, one way from Vadodara.</caption>
              <thead>
                <tr>
                  <th scope="col">Route</th>
                  <th scope="col">Distance</th>
                  <th scope="col">Time</th>
                  <th scope="col">Hatchback</th>
                  <th scope="col">Sedan</th>
                  <th scope="col">SUV</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.slug} className="transition-colors hover:bg-page">
                    <th scope="row">
                      <Link href={r.href} className="font-semibold text-ink underline decoration-[#D9D9D9] underline-offset-4 transition-colors hover:decoration-ink">{r.title}</Link>
                    </th>
                    <td className="whitespace-nowrap tabular-nums">{r.km} km</td>
                    <td className="whitespace-nowrap">{r.time}</td>
                    <td className="tabular-nums">{inr(r.sedan * hatch.mult)}</td>
                    <td className="font-bold tabular-nums text-ink">{r.from}</td>
                    <td className="tabular-nums">{inr(r.sedan * suv.mult)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!rows.length && (
              <p role="status" className="border-t border-line px-5 py-6">
                No listed route matches “{q}”. Call <a href={contact.tel} className="link">{contact.phone}</a> for a fare to any city.
              </p>
            )}
          </div>
          <Link href="/airport-taxi" className="link flex min-h-11 items-center gap-1.5 self-start font-semibold">
            Vadodara airport transfers and fares
            <ArrowRight size={18} />
          </Link>
        </section>
        {children}
      </main>
    </>
  );
}
