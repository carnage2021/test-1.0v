import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { contact, routes } from "@/lib/site-data";
import MobileActionBar from "./MobileActionBar";

const QUICK_LINKS = [
  { label: "Book a one way cab", href: "/#book" },
  { label: "Routes and fares", href: "/routes" },
  { label: "Local rental packages", href: "/routes#local" },
  { label: "Vadodara airport taxi", href: "/airport-taxi" },
  { label: "Customer reviews", href: "/reviews" },
  { label: "FAQ", href: "/faq" },
  { label: "Travel blog", href: "/blog" },
];

const SOCIALS = [
  { label: "The Quick Cab on Instagram", href: "#instagram", Icon: Instagram },
  { label: "The Quick Cab on Facebook", href: "#facebook", Icon: Facebook },
  { label: "The Quick Cab on YouTube", href: "#youtube", Icon: Youtube },
];

const heading = "mb-4 text-sm font-bold uppercase leading-none tracking-[0.08em] text-white";
const item = "py-1.5 text-fog transition-colors hover:text-brand";

export default function SiteFooter() {
  return (
    <footer id="contact" className="relative border-t border-brand/35 bg-night text-[15px] leading-[1.6] text-fog shadow-[0_-1px_40px_rgba(255,187,3,0.10)]">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-10 gap-y-12 pb-8 pt-[72px]">
        <div className="flex flex-col gap-5">
          <Image src="/quick-cab-logo.png" width={122} height={60} alt="The Quick Cab – Intercity Expert" className="block h-[60px] w-[122px] rounded-xl shadow-[0_0_0_1px_rgba(255,255,255,0.08)]" />
          <p className="max-w-[300px] text-pretty">One way, round trip and rental cabs from Vadodara since 2016. Running 24x7 across Gujarat and beyond.</p>
          <div className="flex flex-wrap gap-2">
            {[["App Store", "#ios"], ["Google Play", "#android"]].map(([label, href]) => (
              <a key={label} href={href} className="flex h-11 items-center gap-2 rounded-[10px] border border-white/15 px-3.5 text-[13px] font-semibold text-white transition-colors hover:border-brand">
                {label}
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Quick links">
          <h2 className={heading}>Quick links</h2>
          <div className="flex flex-col gap-0.5">
            {QUICK_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className={item}>{l.label}</Link>
            ))}
          </div>
        </nav>

        <nav aria-label="Popular routes">
          <h2 className={heading}>Popular routes</h2>
          <div className="flex flex-col gap-0.5">
            {routes.slice(0, 8).map((r) => (
              <Link key={r.slug} href={r.href} className={item}>{r.title}</Link>
            ))}
          </div>
        </nav>

        <div>
          <h2 className={heading}>Contact</h2>
          <div className="flex flex-col items-start gap-3">
            <a href={contact.tel} className="text-[22px] font-bold leading-[1.2] tabular-nums text-white transition-colors hover:text-brand">{contact.phone}</a>
            <span className="text-sm">Call or WhatsApp, 24x7</span>
            <a href={contact.mailto} className="text-fog underline underline-offset-2 transition-colors hover:text-brand">{contact.email}</a>
            <span className="text-sm">Vadodara, Gujarat, India</span>
            <div className="mt-1 flex gap-2">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a key={label} href={href} aria-label={label} className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-brand">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="wrap flex flex-wrap gap-x-6 gap-y-3 border-t border-white/[0.08] pb-8 pt-6 text-sm">
        <span>© 2016–{new Date().getFullYear()} The Quick Cab</span>
        <span className="flex-1" />
        {[["Terms", "#terms"], ["Privacy", "#privacy"], ["Request Invoice", "#invoice"]].map(([label, href]) => (
          <a key={label} href={href} className="text-fog underline underline-offset-2 transition-colors hover:text-brand">{label}</a>
        ))}
      </div>

      <MobileActionBar />
    </footer>
  );
}
