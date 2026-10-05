import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight, ArrowUpRight, BadgeIndianRupee, CarFront, CircleCheck, CircleCheckBig, FileCheck2, Flame, Fuel,
  Luggage, MapPin, MapPinned, MessageCircle, Percent, Phone, Receipt, Search, Smartphone, UserRound, Users,
} from "lucide-react";
import BookingWidget from "@/components/BookingWidget";
import NightBackdrop from "@/components/NightBackdrop";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import FaqItem, { FaqSchema } from "@/components/FaqItem";
import JsonLd from "@/components/JsonLd";
import Stars from "@/components/Stars";
import { BookingScreen, TripScreen } from "@/components/AppScreens";
import { cars, contact, faqs, included, routes, SITE_URL } from "@/lib/site-data";

export const metadata = { alternates: { canonical: "/" } };

const TRUST = ["Since 2016", "24x7 service", "AC cars", "Experienced drivers"];
const INCLUDED_ICONS = [Receipt, FileCheck2, UserRound, Fuel, Percent, BadgeIndianRupee];
const STEPS = [
  { Icon: MapPinned, t: "Choose route and date", d: "Enter pickup and drop city, then your date and time. You see the fare straight away." },
  { Icon: CarFront, t: "Pick your car", d: "Hatchback, sedan, SUV or a larger vehicle, with seats and luggage space listed." },
  { Icon: CircleCheckBig, t: "Pay and book", d: "Confirm your details. Driver name and car number reach you by SMS and WhatsApp.", accent: true },
];

const section = "py-[clamp(64px,9vw,112px)]";
const featureIcon = "grid size-[54px] flex-none place-items-center rounded-xl";

export default function HomePage() {
  const [feat, ...rest] = routes;

  return (
    <main id="main">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TaxiService",
          name: "The Quick Cab",
          url: SITE_URL,
          telephone: "+916356544544",
          email: contact.email,
          areaServed: "Gujarat, India",
          address: { "@type": "PostalAddress", addressLocality: "Vadodara", addressRegion: "Gujarat", addressCountry: "IN" },
          openingHours: "Mo-Su 00:00-23:59",
        }}
      />

      {/* Hero */}
      <section id="book" aria-labelledby="h1" className="relative isolate bg-night text-fog">
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          <Image src="/images/hero-expressway-night.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-50" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,22,22,0.92)_0%,rgba(22,22,22,0.6)_55%,rgba(22,22,22,0.8)_100%)]" />
          <NightBackdrop variant="hero" transparent />
        </div>
        <div className="wrap grid items-center gap-12 pb-[clamp(140px,13vw,180px)] pt-[clamp(104px,11vw,150px)] min-[1000px]:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
          <div className="flex flex-col items-start gap-5">
            <span className="font-semibold text-brand">Vadodara’s intercity cab experts</span>
            <h1 id="h1" className="max-w-[640px] text-balance text-[clamp(36px,4.8vw,62px)] font-bold leading-[1.12] tracking-[-0.02em] text-white">
              One Way Cab Service in Vadodara — Fixed Fares, <span className="text-brand">No Return Charges</span>
            </h1>
            <p className="max-w-[520px] text-[clamp(16px,1.4vw,18px)] leading-[1.65]">Book intercity cabs from Vadodara, 24x7. Pay for one way only.</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <a href="#booking-card" className="flex h-[54px] items-center gap-2 rounded-[10px] bg-brand px-7 font-semibold text-ink transition-colors hover:bg-white">
                Check Fare
                <ArrowRight size={18} />
              </a>
              <a href={contact.tel} className="flex h-[54px] items-center gap-2 rounded-[10px] border-[1.5px] border-white px-6 font-semibold tabular-nums text-white transition-colors hover:bg-white hover:text-ink">
                <Phone size={17} />
                {contact.phone}
              </a>
            </div>
            <ul aria-label="Why travellers trust us" className="mt-2.5 flex flex-wrap gap-x-[22px] gap-y-2.5">
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-2 text-[15px] font-medium text-white">
                  <CircleCheck size={18} className="text-brand" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div aria-hidden="true" className="relative hidden h-[500px] items-center justify-center min-[1000px]:flex">
            <span className="absolute size-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,187,3,0.28),transparent_65%)]" />
            <span className="absolute size-[470px] rounded-full border border-dashed border-white/20" />
            <MapPin size={56} fill="currentColor" className="absolute left-[4%] top-[14%] text-brand drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" />
            <MapPin size={44} fill="currentColor" className="absolute right-[2%] top-[8%] text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" />
            <div className="relative flex h-[500px] w-[262px] flex-col overflow-hidden rounded-[40px] border-[10px] border-[#0E0E0E] bg-white shadow-[0_40px_90px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.08)]">
              <div className="relative flex-1 bg-[#EFEFEC]">
                <span className="absolute inset-0" style={{ background: "linear-gradient(90deg,transparent 0 46px,#FFFFFF 46px 56px,transparent 56px 130px,#FFFFFF 130px 138px,transparent 138px),linear-gradient(0deg,transparent 0 70px,#FFFFFF 70px 80px,transparent 80px 170px,#FFFFFF 170px 178px,transparent 178px)" }} />
                <span className="absolute inset-x-3.5 top-3.5 flex h-9 items-center gap-2 rounded-[10px] bg-white px-2.5 text-xs font-medium text-ink shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
                  <Search size={14} className="text-muted" />
                  Ahmedabad
                </span>
                <svg viewBox="0 0 242 250" className="absolute inset-0 size-full">
                  <path d="M50 220 L50 175 L134 175 L134 75 L196 75" fill="none" stroke="#1E1E1E" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" />
                  <path d="M50 220 L50 175 L134 175 L134 75 L196 75" fill="none" stroke="#FFBB03" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
                  <circle cx="50" cy="220" r="8" fill="#1E1E1E" />
                  <circle cx="50" cy="220" r="3.5" fill="#FFFFFF" />
                  <circle cx="196" cy="75" r="9" fill="#FFBB03" stroke="#1E1E1E" strokeWidth="3" />
                </svg>
              </div>
              <div className="flex flex-col gap-2.5 p-4">
                <span className="flex items-center justify-between">
                  <strong className="text-sm text-ink">Vadodara → Ahmedabad</strong>
                  <Stars size={11} className="gap-px!" />
                </span>
                <span className="flex items-baseline justify-between text-xs text-muted">
                  Sedan · 112 km · 2 hr
                  <strong className="text-xl tabular-nums text-ink">{feat.from}</strong>
                </span>
                <span className="grid grid-cols-[1.4fr_1fr] gap-1.5">
                  <span className="grid h-[34px] place-items-center rounded-lg bg-brand text-xs font-semibold text-ink">Confirm</span>
                  <span className="grid h-[34px] place-items-center rounded-lg bg-chip text-xs font-medium text-body">Cancel</span>
                </span>
              </div>
            </div>
            <div className="absolute bottom-[16%] -left-7 flex items-center gap-2.5 rounded-[14px] bg-white py-3 pl-3 pr-4 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
              <span className="grid size-[38px] place-items-center rounded-[10px] bg-brand text-ink"><BadgeIndianRupee size={20} /></span>
              <span className="flex flex-col leading-[1.3]">
                <strong className="text-sm text-ink">No return fare</strong>
                <span className="text-xs text-muted">Pay one way only</span>
              </span>
            </div>
            <div className="absolute bottom-[30%] -right-3 flex items-center gap-2 rounded-xl border border-white/15 bg-ink px-3.5 py-2.5 text-[13px] font-semibold text-white shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
              <span className="size-2 rounded-full bg-mint" />
              Running 24x7
            </div>
          </div>
        </div>
      </section>

      <div id="booking-card" className="relative z-[6] mx-auto -mt-[104px] max-w-[1248px] px-6">
        <div className="rounded-[20px] shadow-[0_30px_80px_rgba(0,0,0,0.16)]">
          <BookingWidget uid="hero" from="Vadodara" layout="bar" />
        </div>
      </div>

      {/* Why Quick Cab */}
      <section id="why" aria-labelledby="why-h" className="pt-[clamp(72px,9vw,112px)]">
        <div className="wrap">
          <div className="mb-11 flex flex-col items-center gap-3 text-center">
            <span className="font-semibold text-gold">Why Quick Cab</span>
            <h2 id="why-h" className="text-balance text-[clamp(30px,3.6vw,46px)] font-bold leading-[1.15] tracking-[-0.02em] text-ink">Intercity travel without the extra charges</h2>
            <p className="max-w-[620px] text-[17px] leading-[1.65]">Many intercity taxis charge for the car’s empty drive back. With a Quick Cab one-way trip, the fare covers your journey and nothing else.</p>
          </div>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
            <li className="flex flex-col gap-5 rounded-[20px] bg-ink p-[30px] text-fog">
              <div className="flex items-start gap-4">
                <span className={`${featureIcon} bg-brand text-ink`}><BadgeIndianRupee size={26} /></span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xl font-semibold text-white">Pay for one way only</h3>
                  <p className="text-[15px] leading-[1.6]">No charge for the car’s empty drive back to Vadodara.</p>
                </div>
              </div>
              <div className="mt-auto flex flex-col gap-2.5 border-t border-white/15 pt-[18px]">
                <span className="flex items-center gap-2.5 text-[13px]"><span className="h-2.5 w-14 rounded-[5px] bg-brand" />Quick Cab one way</span>
                <span className="flex items-center gap-2.5 text-[13px]"><span className="h-2.5 w-28 rounded-[5px] bg-[repeating-linear-gradient(135deg,#5A5A5A_0_6px,#3A3A3A_6px_12px)]" />Paying for the return</span>
              </div>
            </li>
            <li className="flex flex-col gap-5 rounded-[20px] bg-brand p-[30px] text-ink">
              <div className="flex items-start gap-4">
                <span className={`${featureIcon} bg-ink text-brand`}><Receipt size={26} /></span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xl font-semibold">Fixed, all-in fares</h3>
                  <p className="text-[15px] leading-[1.6]">Tolls, state taxes and driver allowance included on the main route.</p>
                </div>
              </div>
              <div className="mt-auto flex flex-wrap gap-x-[18px] gap-y-2 border-t border-ink/20 pt-[18px] text-sm font-semibold">
                {["Tolls", "Taxes", "Driver allowance"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5"><CircleCheck size={16} />{t}</span>
                ))}
              </div>
            </li>
            <li className="flex flex-col gap-5 rounded-[20px] border border-line bg-white p-[30px] shadow-[0_20px_50px_rgba(20,20,20,0.06)]">
              <div className="flex items-start gap-4">
                <span className={`${featureIcon} bg-ink text-white`}><Smartphone size={26} /></span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xl font-semibold text-ink">Book your way, 24x7</h3>
                  <p className="text-[15px] leading-[1.6]">Online, on the app, by phone or on WhatsApp, day or night.</p>
                </div>
              </div>
              <div className="mt-auto flex flex-wrap gap-x-[18px] gap-y-2 border-t border-line pt-[18px] text-sm font-medium text-ink">
                {["App Store", "Google Play", "WhatsApp"].map((t) => (
                  <span key={t} className="flex items-center gap-1.5"><CircleCheck size={16} className="text-gold" />{t}</span>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Popular routes */}
      <section aria-labelledby="routes-h" className={section}>
        <div className="wrap">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
            <div className="flex max-w-[640px] flex-col gap-3">
              <span className="eyebrow">Routes and fares</span>
              <h2 id="routes-h" className="h2-xl">Popular routes from Vadodara</h2>
              <p className="text-[17px] leading-[1.6]">Starting fares for a sedan, one way. Your exact fare shows when you check fare.</p>
            </div>
            <Link href="/routes" className="flex h-12 items-center gap-2 rounded-[10px] border-[1.5px] border-ink px-5 font-semibold text-ink transition-colors hover:bg-ink hover:text-white">
              All routes and fares
              <ArrowRight size={18} />
            </Link>
          </div>
          <ul className="grid gap-4 min-[600px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1180px]:grid-cols-4">
            <li className="min-h-[300px] min-[600px]:col-span-2 min-[900px]:row-span-2">
              <Link href={feat.href} className="relative isolate flex h-full flex-col justify-between gap-6 overflow-hidden rounded-3xl p-7 text-fog shadow-[0_24px_60px_rgba(22,22,22,0.25)] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(22,22,22,0.35)]">
                <NightBackdrop variant="mini" className="-z-10" />
                <span className="flex h-[30px] items-center gap-1.5 self-start rounded-full bg-brand px-3 text-[13px] font-bold text-ink">
                  <Flame size={14} />
                  Most booked
                </span>
                <div className="flex flex-col gap-3">
                  <h3 className="text-[clamp(26px,2.6vw,36px)] font-bold leading-[1.1] tracking-[-0.02em] text-white">{feat.title}</h3>
                  <span className="text-[15px] tabular-nums">{feat.km} km · about {feat.time} · {feat.via}</span>
                  <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[13px] text-mist">Sedan from</span>
                      <span className="text-[44px] font-bold leading-none tabular-nums text-brand [text-shadow:0_0_30px_rgba(255,187,3,0.35)]">{feat.from}</span>
                    </span>
                    <span className="flex h-12 items-center gap-2 rounded-[10px] bg-white px-5 font-bold text-ink">
                      See fares
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
            {rest.slice(0, 8).map((r, i) => (
              <li key={r.slug} className={i >= 6 ? "max-[599px]:hidden" : undefined}>
                <Link href={r.href} className="group flex h-full flex-col gap-4 rounded-[20px] border border-line bg-white p-[22px] transition-[transform,box-shadow,border-color] duration-[250ms] hover:-translate-y-1 hover:border-[#D9D9D9] hover:shadow-[0_20px_44px_rgba(20,20,20,0.10)]">
                  <span aria-hidden="true" className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full border-2 border-ink" />
                    <span className="h-0.5 flex-1 bg-[repeating-linear-gradient(90deg,#D9D9D9_0_6px,transparent_6px_12px)]" />
                    <span className="size-2.5 rounded-full bg-brand shadow-[0_0_0_4px_rgba(255,187,3,0.22)]" />
                  </span>
                  <h3 className="text-[19px] font-bold leading-[1.25] text-ink">{r.title}</h3>
                  <span className="flex flex-wrap gap-1.5">
                    <span className="flex h-7 items-center rounded-full bg-chip px-2.5 text-[13px] font-medium tabular-nums">{r.km} km</span>
                    <span className="flex h-7 items-center rounded-full bg-chip px-2.5 text-[13px] font-medium">{r.time}</span>
                  </span>
                  <span className="mt-auto flex items-end justify-between gap-2">
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[13px] text-muted">from</span>
                      <span className="text-[26px] font-bold leading-none tabular-nums text-ink">{r.from}</span>
                    </span>
                    <span className="grid size-11 place-items-center rounded-full bg-ink text-white transition-colors group-hover:bg-brand group-hover:text-ink">
                      <ArrowUpRight size={18} />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What's included */}
      <section aria-labelledby="inc-h" className={`relative isolate overflow-hidden bg-ink text-fog ${section}`}>
        <NightBackdrop variant="band" labels={false} className="-z-10 opacity-75" />
        <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-center gap-x-[72px] gap-y-10">
          <div className="flex flex-col gap-4">
            <span className="eyebrow text-brand">Fixed fare</span>
            <h2 id="inc-h" className="h2-xl text-white">What’s included in your fare</h2>
            <p className="max-w-[440px] text-pretty text-[17px] leading-[1.6]">The fare you see before booking is the fare you pay for the main route. Extra stops or parking you ask for are added separately.</p>
          </div>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3">
            {included.map((item, i) => {
              const Icon = INCLUDED_ICONS[i];
              return (
                <li key={item.t} className="flex flex-col gap-3.5 rounded-[18px] border border-white/[0.12] bg-white/[0.06] p-5 backdrop-blur-[10px]">
                  <span className="grid size-11 place-items-center rounded-[14px] border border-brand/35 bg-brand/[0.14] text-brand"><Icon size={20} /></span>
                  <span className="flex flex-col gap-1">
                    <strong className="text-[17px] font-bold text-white">{item.t}</strong>
                    <span className="text-sm text-mist">{item.d}</span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-h" className={section}>
        <div className="wrap">
          <div className="mb-14 flex flex-col items-center gap-3 text-center">
            <span className="eyebrow eyebrow-both">Three steps</span>
            <h2 id="how-h" className="h2-xl">How it works</h2>
          </div>
          <ol className="relative grid gap-9 min-[820px]:grid-cols-3 min-[820px]:gap-8">
            <li aria-hidden="true" className="absolute inset-x-[16.6%] top-9 hidden h-0.5 bg-[repeating-linear-gradient(90deg,#1E1E1E_0_8px,transparent_8px_16px)] opacity-35 min-[820px]:block" />
            {STEPS.map((s, i) => (
              <li key={s.t} className="relative flex items-start gap-5 min-[820px]:flex-col min-[820px]:items-center min-[820px]:text-center">
                <span className={`grid size-[72px] flex-none place-items-center rounded-full text-ink shadow-[0_0_0_10px_#F7F7F5,0_0_0_11px_#ECECEC,0_16px_40px_rgba(20,20,20,0.18)] ${s.accent ? "bg-brand" : "bg-white"}`}>
                  <s.Icon size={28} />
                </span>
                <div className="flex max-w-[320px] flex-col gap-2">
                  <span className="text-[13px] font-bold tracking-[0.1em] text-muted">STEP {i + 1}</span>
                  <h3 className="text-[22px] font-bold leading-[1.25] text-ink">{s.t}</h3>
                  <p className="leading-[1.6]">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Fleet */}
      <section aria-labelledby="cars-h" className={`border-t border-line bg-white ${section}`}>
        <div className="wrap">
          <div className="mb-9 flex flex-col gap-3">
            <span className="eyebrow">Fleet</span>
            <h2 id="cars-h" className="h2-xl">Choose a car for your group</h2>
          </div>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
            {cars.map((c) => (
              <li key={c.id} className="flex flex-col rounded-3xl border border-line bg-page p-2.5">
                <div className="relative h-[170px] overflow-hidden rounded-[18px] bg-[linear-gradient(155deg,#1E1E1E_0%,#3A3A3A_100%)]">
                  <span aria-hidden="true" className="absolute -right-[50px] -top-[60px] size-[180px] rounded-full bg-[radial-gradient(circle,rgba(255,187,3,0.55),transparent_65%)]" />
                  <span aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)]" />
                  <span aria-hidden="true" className="absolute -bottom-[18px] left-4 whitespace-nowrap text-[72px] font-bold uppercase leading-none tracking-[-0.02em] text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.28)]">{c.name}</span>
                  <span className="absolute left-3.5 top-3.5 flex gap-1.5">
                    <span className="flex h-[30px] items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.12] px-2.5 text-[13px] font-semibold text-white backdrop-blur-sm" title={`${c.seats} seats`}><Users size={14} />{c.seats}</span>
                    <span className="flex h-[30px] items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.12] px-2.5 text-[13px] font-semibold text-white backdrop-blur-sm" title={`${c.bags} bags`}><Luggage size={14} />{c.bags}</span>
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-1.5 px-3 pb-3 pt-[18px]">
                  <h3 className="text-[21px] font-bold leading-[1.25] text-ink">{c.name}</h3>
                  <span className="text-sm text-muted">{c.eg} · AC</span>
                  <span className="text-sm">{c.seats} seats · {c.bags} medium bags</span>
                  <a href="#booking-card" className="mt-3 flex h-11 items-center gap-1.5 self-start rounded-[10px] border border-line bg-white px-4 text-sm font-semibold text-ink transition-colors hover:border-ink">
                    Check fare
                    <ArrowRight size={16} />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* App and WhatsApp */}
      <section aria-labelledby="apps-h" className={`overflow-hidden ${section}`}>
        <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-x-[72px] gap-y-12">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">App and WhatsApp</span>
            <h2 id="apps-h" className="h2-xl">Book faster on the app or WhatsApp</h2>
            <p className="max-w-[440px] text-[17px] leading-[1.6]">Save your pickup address, see past trips and get driver details in one place.</p>
            <div className="mt-2 flex flex-wrap gap-2.5">
              {[["Download on the", "App Store", "#ios"], ["Get it on", "Google Play", "#android"]].map(([small, big, href]) => (
                <a key={big} href={href} className="flex h-[54px] flex-col justify-center rounded-[14px] bg-black px-5 leading-[1.15] text-white transition-colors hover:bg-graphite">
                  <span className="text-[11px] text-fog">{small}</span>
                  <span className="text-[17px] font-bold">{big}</span>
                </a>
              ))}
              <a href={contact.wa} className="flex h-[54px] items-center gap-2 rounded-[10px] border-[1.5px] border-ok px-[22px] font-semibold text-ok-ink transition-colors hover:bg-[#E7F6F0]">
                <MessageCircle size={18} />
                Book on WhatsApp
              </a>
            </div>
          </div>
          <div className="relative flex items-end justify-center gap-5 py-6">
            <span aria-hidden="true" className="absolute left-1/2 top-1/2 size-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,187,3,0.35),transparent_65%)]" />
            <span aria-hidden="true" className="absolute left-1/2 top-1/2 size-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#D9D9D9]" />
            <div role="img" aria-label="The Quick Cab app – booking screen" className="qc-phone relative aspect-[9/19] w-[min(220px,44%)] overflow-hidden rounded-[36px] border-8 border-ink bg-[linear-gradient(180deg,#1E1E1E,#3A3A3A)] shadow-[0_40px_80px_rgba(20,20,20,0.30)]">
              <BookingScreen />
            </div>
            <div role="img" aria-label="The Quick Cab app – trip details screen" className="qc-phone relative mb-10 aspect-[9/19] w-[min(200px,40%)] overflow-hidden rounded-[34px] border-8 border-white bg-page shadow-[0_40px_80px_rgba(20,20,20,0.22)]">
              <TripScreen />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section aria-labelledby="rev-h" className={`border-t border-line bg-white ${section}`}>
        <ReviewsCarousel />
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-h" className={section}>
        <FaqSchema items={faqs} />
        <div className="wrap flex flex-wrap items-start gap-x-[72px] gap-y-10">
          <div className="flex max-w-[400px] flex-[1_1_300px] flex-col gap-4 min-[1000px]:sticky min-[1000px]:top-[110px]">
            <span className="eyebrow">FAQ</span>
            <h2 id="faq-h" className="h2-xl">Frequently asked questions</h2>
            <p className="leading-[1.6]">Can’t find your answer? We pick up calls and WhatsApp messages 24x7.</p>
            <div className="mt-1 flex flex-wrap gap-2.5">
              <a href={contact.tel} className="flex h-12 items-center gap-2 rounded-[10px] bg-ink px-[18px] font-semibold text-white transition-colors hover:bg-graphite">
                <Phone size={17} />
                Call us
              </a>
              <Link href="/faq" className="flex h-12 items-center rounded-[10px] border-[1.5px] border-ink px-[18px] font-semibold text-ink transition-colors hover:bg-white">See all FAQs</Link>
            </div>
          </div>
          <div className="flex min-w-[min(100%,300px)] flex-[999_1_520px] flex-col gap-2.5">
            {faqs.map((f) => (
              <FaqItem key={f.q} {...f} strong />
            ))}
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section aria-labelledby="cta-h" className="px-6 pb-[clamp(64px,9vw,112px)]">
        <div className="relative isolate mx-auto flex max-w-[1200px] flex-col items-center gap-5 overflow-hidden rounded-[32px] px-6 py-[clamp(48px,7vw,96px)] text-center shadow-[0_40px_100px_rgba(22,22,22,0.30)]">
          <NightBackdrop variant="cta" className="-z-10" />
          <h2 id="cta-h" className="max-w-[720px] text-balance text-[clamp(32px,4.6vw,60px)] font-bold leading-[1.04] tracking-[-0.02em] text-white">Ready to go? Check your fare in 30 seconds.</h2>
          <p className="text-lg text-fog">One way, round trip or rental. Any time of day.</p>
          <div className="mt-2 flex flex-wrap justify-center gap-2.5">
            <a href="#booking-card" className="flex h-14 items-center gap-2 rounded-[10px] bg-brand px-[30px] text-[17px] font-bold text-ink shadow-[0_10px_40px_rgba(255,187,3,0.40)] transition-colors hover:bg-brand-dark">
              Check Fare
              <ArrowRight size={18} />
            </a>
            <a href={contact.tel} className="flex h-14 items-center gap-2 rounded-[10px] border border-white/20 bg-white/[0.08] px-6 font-semibold tabular-nums text-white transition-colors hover:bg-white/15">
              <Phone size={17} />
              {contact.phone}
            </a>
            <a href={contact.wa} className="flex h-14 items-center gap-2 rounded-[10px] border border-white/20 bg-white/[0.08] px-6 font-semibold text-white transition-colors hover:bg-white/15">
              <MessageCircle size={17} className="text-mint" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
