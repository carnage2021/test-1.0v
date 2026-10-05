"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Phone } from "lucide-react";
import { contact, posts } from "@/lib/site-data";

function bookAction(pathname: string) {
  if (pathname.startsWith("/routes/")) return { href: "#widget", label: "Book this route" };
  if (pathname === "/airport-taxi") return { href: "#book", label: "Book" };
  const post = posts.find((p) => pathname === `/blog/${p.slug}`);
  if (post) return { href: `/routes/${post.routeSlug}`, label: "Book" };
  return { href: "/#booking-card", label: "Book" };
}

/** Fixed call / WhatsApp / book bar on small screens. Hidden inside the booking flow. */
export default function MobileActionBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/booking")) return null;
  const { href, label } = bookAction(pathname);

  return (
    <div className="md:hidden">
      <div className="h-20" />
      <div
        role="region"
        aria-label="Quick actions"
        className="fixed inset-x-0 bottom-0 z-[60] grid grid-cols-[1fr_1.15fr_1.2fr] gap-1.5 border-t border-line bg-white px-3 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom))] shadow-[0_-6px_24px_rgba(20,20,20,0.08)]"
      >
        <a href={contact.tel} className="flex h-[52px] items-center justify-center gap-1.5 rounded-full border-[1.5px] border-ink text-sm font-semibold text-ink min-[400px]:text-[15px]">
          <Phone size={18} />
          Call
        </a>
        <a href={contact.wa} className="flex h-[52px] items-center justify-center gap-1.5 rounded-full border-[1.5px] border-ok text-sm font-semibold text-ok-ink min-[400px]:text-[15px]">
          <MessageCircle size={18} />
          WhatsApp
        </a>
        <Link href={href} className="flex h-[52px] items-center justify-center rounded-full bg-brand px-2 text-center text-[15px] font-bold leading-tight text-ink">
          {label}
        </Link>
      </div>
    </div>
  );
}
