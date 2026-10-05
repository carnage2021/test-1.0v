import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { posts } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Travel Blog | Road Trips from Vadodara",
  description: "Route advice, day trips and airport timings from The Quick Cab drivers and team in Vadodara.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const [feat, ...rest] = posts;
  return (
    <>
      <PageHero crumbs={[{ label: "Blog" }]}>
        <header className="flex flex-col gap-3.5 pb-8 pt-6">
          <h1 className="h1-page">Travel guides and tips</h1>
          <p className="max-w-[600px] text-[17px] leading-[1.6]">Route advice, day trips and airport timings from our drivers and team in Vadodara.</p>
        </header>
      </PageHero>
      <main id="main" className="wrap pb-[clamp(56px,8vw,96px)] pt-10">
        <article className="group relative mb-6 grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-x-12 gap-y-6 rounded-2xl border border-line bg-white p-5 transition-shadow hover:shadow-[0_10px_30px_rgba(20,20,20,0.08)]">
          <div className="relative aspect-video overflow-hidden rounded-xl">
            <Image src={feat.image} alt={feat.imageAlt} fill priority sizes="(min-width: 900px) 580px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-[13px] font-semibold text-graphite">{feat.tag} · {feat.date}</span>
            <h2 className="h2-md">
              <Link href={`/blog/${feat.slug}`} className="after:absolute after:inset-0 group-hover:underline">{feat.title}</Link>
            </h2>
            <p className="leading-[1.6]">{feat.excerpt}</p>
            <span className="text-sm text-muted">{feat.read}</span>
          </div>
        </article>
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-4">
          {rest.map((p) => (
            <li key={p.slug}>
              <article className="group relative flex h-full flex-col gap-3 rounded-2xl border border-line bg-white p-4 transition-shadow hover:shadow-[0_10px_30px_rgba(20,20,20,0.08)]">
                <div className="relative aspect-video overflow-hidden rounded-[10px]">
                  <Image src={p.image} alt={p.imageAlt} fill sizes="(min-width: 900px) 380px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
                <span className="text-[13px] font-semibold text-graphite">{p.tag} · {p.date}</span>
                <h2 className="text-[19px] font-bold leading-[1.3] text-ink">
                  <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0 group-hover:underline">{p.title}</Link>
                </h2>
                <p className="text-[15px] leading-[1.6]">{p.excerpt}</p>
              </article>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
