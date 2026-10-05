import type { Metadata } from "next";
import { MessageCircle, Phone } from "lucide-react";
import FaqItem, { FaqSchema } from "@/components/FaqItem";
import PageHero from "@/components/PageHero";
import { contact, faqGroups, faqs } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "FAQ | One Way Cabs from Vadodara",
  description: "Answers on booking, fares, payment, luggage, cancellations and airport pickups with The Quick Cab.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <FaqSchema items={faqs} />
      <PageHero crumbs={[{ label: "FAQ" }]}>
        <header className="flex max-w-[640px] flex-col gap-3.5 pb-2 pt-6">
          <h1 className="h1-page">Frequently asked questions</h1>
          <p className="text-[17px] leading-[1.6]">Booking, fares and what to expect on the trip.</p>
        </header>
      </PageHero>
      <main id="main" className="wrap pb-[clamp(56px,8vw,96px)] pt-6">
        <div className="flex flex-wrap items-start gap-x-16 gap-y-10 pt-6">
          <div className="flex max-w-[400px] flex-[1_1_300px] flex-col gap-3 rounded-2xl bg-ink p-6 text-fog min-[1000px]:sticky min-[1000px]:top-28">
            <h2 className="text-lg font-bold text-white">Still have a question?</h2>
            <p className="text-[15px] leading-[1.6]">We answer calls and WhatsApp messages 24x7.</p>
            <a href={contact.tel} className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand font-bold tabular-nums text-ink transition-colors hover:bg-brand-dark">
              <Phone size={18} />
              Call {contact.phone}
            </a>
            <a href={contact.wa} className="flex h-12 items-center justify-center gap-2 rounded-full border-[1.5px] border-white font-semibold text-white transition-colors hover:bg-graphite">
              <MessageCircle size={18} />
              WhatsApp us
            </a>
          </div>
          <div className="flex min-w-[min(100%,300px)] flex-[999_1_520px] flex-col gap-10">
            {faqGroups.map((g) => (
              <section key={g.title} className="flex flex-col gap-3">
                <h2 className="mb-1 text-2xl font-bold text-ink">{g.title}</h2>
                {g.items.map((f) => <FaqItem key={f.q} {...f} />)}
              </section>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
