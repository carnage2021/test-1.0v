import Link from "next/link";
import type { ReactNode } from "react";
import NightBackdrop from "./NightBackdrop";
import JsonLd from "./JsonLd";
import { SITE_URL } from "@/lib/site-data";

export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  const trail = [{ label: "Home", href: "/" }, ...items];
  return (
    <nav aria-label="Breadcrumb" className="pt-5">
      <ol className="flex flex-wrap gap-2 text-sm text-mist">
        {trail.map((c, i) => (
          <li key={c.label} className="flex gap-2">
            {c.href ? (
              <Link href={c.href} className="underline underline-offset-2 hover:text-white">{c.label}</Link>
            ) : (
              <span aria-current="page" className="font-medium text-white">{c.label}</span>
            )}
            {i < trail.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: trail.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            ...(c.href ? { item: SITE_URL + c.href } : {}),
          })),
        }}
      />
    </nav>
  );
}

/** Dark page header band with the animated route map, breadcrumb and a gold hairline. */
export default function PageHero({
  crumbs,
  children,
  narrow = false,
  className = "pb-12 pt-[88px]",
}: {
  crumbs: Crumb[];
  children: ReactNode;
  narrow?: boolean;
  className?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-fog">
      <NightBackdrop variant="band" className="-z-10" />
      <div className={`mx-auto px-6 ${narrow ? "max-w-[760px]" : "max-w-[1248px]"} ${className}`}>
        <Breadcrumb items={crumbs} />
        {children}
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,187,3,0.6),transparent)]" />
    </section>
  );
}
