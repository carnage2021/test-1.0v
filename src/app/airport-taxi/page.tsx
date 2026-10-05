import type { Metadata } from "next";
import Image from "next/image";
import { Plane } from "lucide-react";
import BookingWidget from "@/components/BookingWidget";
import FaqItem, { FaqSchema } from "@/components/FaqItem";
import NightBackdrop from "@/components/NightBackdrop";
import { Breadcrumb } from "@/components/PageHero";
import { cars, faqs as allFaqs, inr } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Vadodara Airport Taxi | Pickup and Drop 24x7",
  description: "Fixed-fare taxis to and from Vadodara Airport (BDQ), 24x7. Share your flight number and your driver tracks the arrival.",
  alternates: { canonical: "/airport-taxi" },
};

const suvMult = cars[2].mult;
const TRANSFERS = [
  { to: "Vadodara city (Alkapuri, Sayajigunj)", km: 8, sedan: 499 },
  { to: "Anand", km: 45, sedan: 1099 },
  { to: "Bharuch", km: 80, sedan: 1599 },
  { to: "Statue of Unity", km: 95, sedan: 1999 },
  { to: "Ahmedabad", km: 115, sedan: 2099 },
];

const STEPS = [
  { t: "Add your flight number", d: "We track delays, so the pickup moves with your flight." },
  { t: "Get driver details", d: "Name, phone and car number arrive by SMS and WhatsApp." },
  { t: "Meet at arrivals", d: "Your driver waits at the arrivals exit with a name board." },
];

const FAQS = [
  allFaqs[6],
  { q: "What if my flight is late?", a: "Your driver tracks the flight and adjusts the pickup time. Waiting time rules are shown before you confirm." },
  { q: "Can I book a drop to the airport for an early flight?", a: "Yes. We run 24x7, so 3 am and 4 am pickups are normal for us." },
];

export default function AirportPage() {
  return (
    <main id="main">
      <FaqSchema items={FAQS} />
      <section id="book" aria-labelledby="h1" className="relative isolate bg-night text-fog">
        <NightBackdrop variant="band" className="-z-10" />
        <div className="wrap pb-[clamp(48px,6vw,88px)] pt-[68px]">
          <Breadcrumb items={[{ label: "Vadodara Airport Taxi" }]} />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-x-[clamp(28px,5vw,72px)] gap-y-8 pt-8">
            <div className="flex flex-col gap-[18px]">
              <span className="glass flex h-8 items-center gap-2 self-start rounded-full px-3.5 text-sm font-semibold text-white">
                <Plane size={16} />
                Harni Airport (BDQ)
              </span>
              <h1 id="h1" className="text-balance text-[clamp(30px,4.2vw,52px)] font-bold leading-[1.08] tracking-[-0.02em] text-white">Vadodara Airport Taxi — Pickup and Drop, 24x7</h1>
              <p className="max-w-[500px] text-[17px] leading-[1.6]">Fixed fares to and from Vadodara Airport. Share your flight number and your driver tracks the arrival.</p>
            </div>
            <div className="rounded-[26px] border border-white/15 bg-white/[0.07] p-2.5 shadow-[0_40px_100px_rgba(0,0,0,0.45)] backdrop-blur-[18px]">
              <BookingWidget uid="air" from="Vadodara Airport" />
            </div>
          </div>
        </div>
      </section>

      <div className="wrap flex flex-col gap-[72px] py-[clamp(56px,8vw,96px)]">
        <section aria-labelledby="af-h" className="flex flex-col gap-4">
          <h2 id="af-h" className="h2-md">Airport transfer fares</h2>
          <div className="relative overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="qc-table min-w-[560px]">
              <caption>Fares in INR from Vadodara Airport, one way.</caption>
              <thead>
                <tr>
                  <th scope="col">To</th>
                  <th scope="col">Distance</th>
                  <th scope="col">Sedan</th>
                  <th scope="col">SUV</th>
                </tr>
              </thead>
              <tbody>
                {TRANSFERS.map((a) => (
                  <tr key={a.to}>
                    <th scope="row">{a.to}</th>
                    <td className="tabular-nums">{a.km} km</td>
                    <td className="font-bold tabular-nums text-ink">{inr(a.sedan)}</td>
                    <td className="tabular-nums">{inr(a.sedan * suvMult)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="ap-h" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-center gap-x-16 gap-y-8">
          <div className="flex flex-col gap-5">
            <h2 id="ap-h" className="h2-md">How airport pickup works</h2>
            <ol className="flex flex-col gap-4">
              {STEPS.map((s, i) => (
                <li key={s.t} className="flex gap-4">
                  <span className="grid size-9 flex-none place-items-center rounded-full bg-brand text-[15px] font-bold text-ink">{i + 1}</span>
                  <div>
                    <h3 className="mb-1 text-[17px] font-bold text-ink">{s.t}</h3>
                    <p className="leading-[1.6]">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
            <Image src="/images/airport-pickup.jpg" alt="Cars waiting at an airport terminal pickup kerb" fill sizes="(min-width: 800px) 580px, 100vw" className="object-cover" />
          </div>
        </section>

        <section aria-labelledby="afaq-h" className="flex max-w-[880px] flex-col gap-4">
          <h2 id="afaq-h" className="h2-md">Airport transfer FAQs</h2>
          <div className="flex flex-col gap-2.5">
            {FAQS.map((f) => <FaqItem key={f.q} {...f} />)}
          </div>
        </section>
      </div>
    </main>
  );
}
