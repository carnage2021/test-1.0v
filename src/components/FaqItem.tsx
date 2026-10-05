import { ChevronDown } from "lucide-react";
import JsonLd from "./JsonLd";
import type { Faq } from "@/lib/site-data";

/** `strong` is the larger home-page style with a round chevron badge. */
export default function FaqItem({ q, a, strong = false }: Faq & { strong?: boolean }) {
  if (strong) {
    return (
      <details className="faq faq-strong rounded-2xl">
        <summary className="flex min-h-16 cursor-pointer list-none items-center gap-4 pl-6 pr-5">
          <h3 className="flex-1 py-[18px] text-[17px] font-semibold leading-[1.4] text-ink">{q}</h3>
          <span className="grid size-9 flex-none place-items-center rounded-full bg-chip">
            <ChevronDown size={18} className="faq-chev text-ink transition-transform duration-200" />
          </span>
        </summary>
        <p className="max-w-[680px] px-6 pb-[22px] leading-[1.65]">{a}</p>
      </details>
    );
  }
  return (
    <details className="faq rounded-xl">
      <summary className="flex min-h-[60px] cursor-pointer list-none items-center gap-4 px-5">
        <h3 className="flex-1 py-4 text-[17px] font-semibold leading-[1.4] text-ink">{q}</h3>
        <ChevronDown size={20} className="faq-chev text-muted transition-transform duration-200" />
      </summary>
      <p className="px-5 pb-5 leading-[1.65]">{a}</p>
    </details>
  );
}

export function FaqSchema({ items }: { items: Faq[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      }}
    />
  );
}
