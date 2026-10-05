"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Facebook, Instagram, Mail, MapPin, Menu, MessageCircle, Phone, X, Youtube } from "lucide-react";
import { contact } from "@/lib/site-data";

const LINKS = [
  { id: "book", label: "Book One Way", href: "/#book" },
  { id: "routes", label: "Routes & Fares", href: "/routes" },
  { id: "local", label: "Local Packages", href: "/routes#local" },
  { id: "reviews", label: "Reviews", href: "/reviews" },
  { id: "why", label: "Why Us", href: "/#why" },
  { id: "faq", label: "FAQ", href: "/faq" },
  { id: "contact", label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { label: "Facebook", href: "#facebook", Icon: Facebook },
  { label: "Instagram", href: "#instagram", Icon: Instagram },
  { label: "YouTube", href: "#youtube", Icon: Youtube },
  { label: "WhatsApp", href: contact.wa, Icon: MessageCircle },
];

function activeId(pathname: string) {
  if (pathname === "/") return "book";
  if (pathname.startsWith("/routes")) return "routes";
  if (pathname.startsWith("/reviews")) return "reviews";
  if (pathname.startsWith("/faq")) return "faq";
  return "";
}

export default function SiteHeader() {
  const pathname = usePathname();
  const active = activeId(pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    // The dark strip is taller than its content row so the white card overlaps it
    // without covering the contact details; the negative top keeps only the card pinned.
    <header id="top" className="pointer-events-none sticky -top-5 z-50 h-11 bg-ink min-[1240px]:-top-8 min-[1240px]:h-16">
      <div className="pointer-events-auto bg-ink">
        <div className="wrap flex h-[30px] items-center gap-7 text-sm text-[#E6E6E6] min-[1240px]:h-[42px]">
          <a href={contact.tel} className="flex items-center gap-2 tabular-nums hover:text-brand">
            <Phone size={15} className="text-brand" />
            {contact.phone}
          </a>
          <a href={contact.mailto} className="hidden items-center gap-2 hover:text-brand min-[1240px]:flex">
            <Mail size={15} className="text-brand" />
            {contact.email}
          </a>
          <span className="hidden items-center gap-2 min-[1240px]:flex">
            <MapPin size={15} className="text-brand" />
            Vadodara, Gujarat · 24x7
          </span>
          <span className="flex-1" />
          <div className="hidden gap-2 min-[1240px]:flex">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a key={label} href={href} aria-label={label} className="grid size-[34px] place-items-center rounded-lg bg-brand text-ink transition-colors hover:bg-white">
                <Icon size={16} />
              </a>
            ))}
          </div>
          <span className="flex items-center gap-1.5 min-[1240px]:hidden">
            <span className="size-[7px] rounded-full bg-mint" />
            24x7
          </span>
        </div>
      </div>

      <div className="pointer-events-auto relative mx-auto max-w-[1248px] px-3 min-[600px]:px-6">
        <div className="flex min-h-[68px] items-center gap-5 rounded-2xl bg-white py-2.5 pl-2.5 pr-3 shadow-[0_18px_50px_rgba(0,0,0,0.18)]">
          <Link href="/" aria-label="The Quick Cab – home" className="flex flex-none">
            <Image src="/quick-cab-logo.png" width={104} height={51} alt="The Quick Cab – Intercity Expert" priority className="block h-[51px] w-[104px] rounded-[10px]" />
          </Link>

          <nav aria-label="Main" className="hidden flex-1 items-center justify-center gap-0.5 min-[1240px]:flex">
            {LINKS.map((l) => (
              <Link
                key={l.id}
                href={l.href}
                aria-current={l.id === active ? "page" : undefined}
                className={`whitespace-nowrap rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors hover:text-gold ${l.id === active ? "text-gold" : "text-ink"}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <a href="#login" className="hidden h-11 items-center px-3 text-[15px] font-medium text-ink transition-colors hover:text-gold min-[1240px]:flex">
            Login
          </a>
          <Link href="/#booking-card" className="hidden h-12 items-center whitespace-nowrap rounded-[10px] bg-brand px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-ink hover:text-white min-[1240px]:flex">
            Book Now
          </Link>

          <div className="ml-auto flex gap-2 min-[1240px]:hidden">
            <a href={contact.tel} aria-label={`Call ${contact.phone}`} className="grid size-[46px] place-items-center rounded-[10px] bg-brand text-ink">
              <Phone size={20} />
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
              className="grid size-[46px] place-items-center rounded-[10px] bg-ink text-white"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Main"
            className="absolute inset-x-3 top-full mt-2 flex max-h-[calc(100dvh-120px)] flex-col overflow-y-auto rounded-2xl bg-white px-5 pb-5 pt-2 shadow-[0_18px_50px_rgba(0,0,0,0.18)] min-[600px]:inset-x-6 min-[1240px]:hidden"
          >
            {LINKS.map((l) => (
              <Link
                key={l.id}
                href={l.href}
                onClick={close}
                aria-current={l.id === active ? "page" : undefined}
                className={`flex min-h-[52px] items-center border-b border-[#F0F0F0] text-[17px] font-medium ${l.id === active ? "text-gold" : "text-ink"}`}
              >
                {l.label}
              </Link>
            ))}
            <a href="#login" onClick={close} className="flex min-h-[52px] items-center text-[17px] font-medium text-ink">
              Login
            </a>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a href={contact.tel} className="flex h-[52px] items-center justify-center rounded-[10px] bg-brand font-semibold text-ink">
                Call now
              </a>
              <a href={contact.wa} className="flex h-[52px] items-center justify-center rounded-[10px] bg-ink font-semibold text-white">
                WhatsApp
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
