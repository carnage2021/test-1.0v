import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CircleCheck, Clock, MapPin, MessageCircle, Phone, Route as RouteIcon } from "lucide-react";
import BookingWidget from "@/components/BookingWidget";
import FaqItem, { FaqSchema } from "@/components/FaqItem";
import PageHero from "@/components/PageHero";
import { contact, included, routes } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return routes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = routes.find((x) => x.slug === slug);
  if (!r) return {};
  return {
    title: `Vadodara to ${r.to} Taxi | One Way Cab Fare`,
    description: `One way cab from Vadodara to ${r.to}: ${r.km} km, about ${r.time}. Sedan from ${r.from}, tolls and taxes included, no return fare.`,
    alternates: { canonical: r.href },
  };
}

const stat = "glass flex min-h-10 items-center gap-2 rounded-[10px] px-3.5 py-1.5";

export default async function RoutePage({ params }: Props) {
  const { slug } = await params;
  const r = routes.find((x) => x.slug === slug);
  if (!r) notFound();

  const notes = slug === "ahmedabad"
    ? { time: "Leave before 8 am or after 8 pm to avoid city traffic at both ends. The Expressway itself moves well all day.", stops: "The Expressway has food courts near Nadiad. Tell the driver when booking if you want a stop at Anand or Nadiad." }
    : { time: `Early-morning starts avoid city traffic and give you most of the day at ${r.to}.`, stops: "Your driver can stop for tea, food and rest breaks on request. Add any planned stops when you book." };

  const faqs = [
    { q: `How much is a one way cab from Vadodara to ${r.to}?`, a: `A one way sedan starts from ${r.from}. The exact fare for your car and date shows when you check fare.` },
    { q: `How long does Vadodara to ${r.to} take by cab?`, a: `About ${r.time} for ${r.km} km via ${r.via}, depending on traffic.` },
    { q: "Do I pay for the return journey?", a: `No. On a one-way booking you pay for Vadodara to ${r.to} only.` },
    { q: `Can I book a cab from ${r.to} to Vadodara?`, a: `Yes. Enter ${r.to} as the pickup city in the booking form, or call ${contact.phone}.` },
  ];
  const related = routes.filter((x) => x.slug !== slug).slice(0, 4);
  const bookHref = (car: string) => `/booking?${new URLSearchParams({ trip: "oneway", from: "Vadodara", to: r.to, car })}`;

  return (
    <>
      <PageHero crumbs={[{ label: "Routes & Fares", href: "/routes" }, { label: r.title }]}>
        <header className="flex flex-col gap-[18px] pb-8 pt-6">
          <h1 className="h1-page max-w-[860px] text-balance">Vadodara to {r.to} Taxi — One Way Cab Fare</h1>
          <dl className="flex flex-wrap gap-2.5">
            <div className={stat}>
              <RouteIcon size={17} className="text-mist" />
              <dt className="text-sm text-mist">Distance</dt>
              <dd className="font-semibold tabular-nums text-white">{r.km} km</dd>
            </div>
            <div className={stat}>
              <Clock size={17} className="text-mist" />
              <dt className="text-sm text-mist">Travel time</dt>
              <dd className="font-semibold text-white">about {r.time}</dd>
            </div>
            <div className={stat}>
              <MapPin size={17} className="text-mist" />
              <dt className="text-sm text-mist">Via</dt>
              <dd className="font-semibold text-white">{r.via}</dd>
            </div>
          </dl>
        </header>
      </PageHero>

      <main id="main" className="wrap pt-10">
        <FaqSchema items={faqs} />
        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-10 pb-[clamp(56px,8vw,96px)] min-[1000px]:grid-cols-[minmax(0,1fr)_400px]">
          <aside id="widget" aria-label="Book this route" className="flex min-w-0 flex-col gap-3 min-[1000px]:sticky min-[1000px]:top-24 min-[1000px]:order-2">
            <BookingWidget key={r.slug} uid="route" from="Vadodara" to={r.to} />
            <div className="grid grid-cols-2 gap-2">
              <a href={contact.tel} className="flex h-12 items-center justify-center gap-2 rounded-full border-[1.5px] border-ink text-[15px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white">
                <Phone size={17} />
                Call
              </a>
              <a href={contact.wa} className="flex h-12 items-center justify-center gap-2 rounded-full border-[1.5px] border-ok text-[15px] font-semibold text-ok-ink transition-colors hover:bg-[#E7F6F0]">
                <MessageCircle size={17} />
                WhatsApp
              </a>
            </div>
          </aside>

          <div className="flex min-w-0 flex-col gap-14">
            <section aria-labelledby="fares-h" className="flex flex-col gap-4">
              <h2 id="fares-h" className="h2-md">{r.to} cab fares from Vadodara</h2>
              <div className="relative overflow-x-auto rounded-2xl border border-line bg-white">
                <table className="qc-table min-w-[560px]">
                  <caption>Fares in INR, including items listed under “What’s included”. Round trip shown for 2 days.</caption>
                  <thead>
                    <tr>
                      <th scope="col">Car type</th>
                      <th scope="col">Seats</th>
                      <th scope="col">One way</th>
                      <th scope="col">Round trip</th>
                      <th scope="col"><span className="sr-only">Action</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {r.fares.map((f) => (
                      <tr key={f.car}>
                        <th scope="row">
                          {f.car}
                          <div className="text-[13px] font-normal text-muted">{f.eg}</div>
                        </th>
                        <td className="tabular-nums">{f.seats}</td>
                        <td className="text-lg font-bold tabular-nums text-ink">{f.oneWay}</td>
                        <td className="tabular-nums">{f.round}</td>
                        <td className="text-right">
                          <Link href={bookHref(f.car)} className="inline-flex h-11 items-center whitespace-nowrap rounded-[10px] bg-brand px-[18px] text-sm font-bold text-ink transition-colors hover:bg-brand-dark">
                            Book {f.car}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section aria-labelledby="inc-h" className="flex flex-col gap-4">
              <h2 id="inc-h" className="h2-md">What’s included</h2>
              <ul className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-2.5">
                {included.map((i) => (
                  <li key={i.t} className="flex items-center gap-2.5 rounded-xl border border-line bg-white px-4 py-3.5 font-medium text-ink">
                    <CircleCheck size={20} className="text-ok" />
                    {i.t}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="notes-h" className="flex flex-col gap-4">
              <h2 id="notes-h" className="h2-md">Route notes</h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
                {[["Best time to travel", notes.time], ["Stops on the way", notes.stops]].map(([t, d]) => (
                  <div key={t} className="flex flex-col gap-2 rounded-2xl border border-line bg-white p-6">
                    <h3 className="text-lg font-bold text-ink">{t}</h3>
                    <p className="leading-[1.65]">{d}</p>
                  </div>
                ))}
              </div>
            </section>

            <section aria-labelledby="rfaq-h" className="flex flex-col gap-4">
              <h2 id="rfaq-h" className="h2-md">Vadodara to {r.to} cab: FAQs</h2>
              <div className="flex flex-col gap-2.5">
                {faqs.map((f) => <FaqItem key={f.q} {...f} />)}
              </div>
            </section>

            <section aria-labelledby="rel-h" className="flex flex-col gap-4">
              <h2 id="rel-h" className="h2-md">Related routes</h2>
              <ul className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
                {related.map((x) => (
                  <li key={x.slug}>
                    <Link href={x.href} className="flex h-full flex-col gap-1.5 rounded-2xl border border-line bg-white p-[18px] transition-[border-color,box-shadow] hover:border-[#D9D9D9] hover:shadow-[0_10px_30px_rgba(20,20,20,0.08)]">
                      <span className="font-bold text-ink">{x.title}</span>
                      <span className="text-sm tabular-nums text-muted">{x.km} km · from {x.from}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
