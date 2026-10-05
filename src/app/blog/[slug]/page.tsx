import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { posts, routes, SITE_URL, type Block } from "@/lib/site-data";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.excerpt, publishedTime: p.isoDate, images: [p.image] },
  };
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h2":
      return <h2 className="mt-4 text-[28px] font-bold leading-[1.25] text-ink">{block.text}</h2>;
    case "h3":
      return <h3 className="mt-1 text-[21px] font-bold text-ink">{block.text}</h3>;
    case "ul":
      return (
        <ul className="flex list-disc flex-col gap-1.5 pl-[22px]">
          {block.items.map((i) => <li key={i}>{i}</li>)}
        </ul>
      );
    case "cta": {
      const r = routes.find((x) => x.slug === block.routeSlug);
      if (!r) return null;
      return (
        <aside aria-label="Book this trip" className="my-3 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-ink p-6 text-fog">
          <div className="flex flex-col gap-1">
            <span className="text-[19px] font-bold text-white">{r.title}</span>
            <span className="text-[15px]">Sedan from {r.from} one way</span>
          </div>
          <Link href={r.href} className="flex h-12 items-center rounded-[10px] bg-brand px-[22px] text-base font-bold text-ink transition-colors hover:bg-brand-dark">See fares for this route</Link>
        </aside>
      );
    }
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((x) => x.slug === slug);
  if (!post) notFound();
  const more = posts.filter((p) => p.slug !== slug);

  return (
    <main id="main" className="bg-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.isoDate,
          image: SITE_URL + post.image,
          author: { "@type": "Organization", name: "The Quick Cab" },
          publisher: { "@type": "Organization", name: "The Quick Cab" },
        }}
      />
      <PageHero narrow crumbs={[{ label: "Blog", href: "/blog" }, { label: post.crumb }]}>
        <header className="flex flex-col gap-4 pb-6 pt-7">
          <span className="text-sm font-semibold text-brand">{post.tag}</span>
          <h1 className="text-balance text-[clamp(30px,4.4vw,48px)] font-bold leading-[1.1] tracking-[-0.02em] text-white">{post.title}</h1>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-mist">
            <span>By The Quick Cab team</span>
            <time dateTime={post.isoDate}>{post.date}</time>
            <span>{post.read}</span>
          </div>
        </header>
      </PageHero>

      <article className="mx-auto max-w-[760px] px-6 pb-[clamp(48px,7vw,80px)] pt-10">
        <figure className="mb-8">
          <div className="relative aspect-video overflow-hidden rounded-2xl">
            <Image src={post.image} alt={post.imageAlt} fill priority sizes="(min-width: 760px) 712px, 100vw" className="object-cover" />
          </div>
        </figure>
        <div className="flex flex-col gap-5 text-lg leading-[1.75]">
          {post.body.map((b, i) => <BlockView key={i} block={b} />)}
        </div>
      </article>

      <section aria-labelledby="more-h" className="border-t border-line bg-page px-6 py-[clamp(48px,7vw,80px)]">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-5">
          <h2 id="more-h" className="h2-md">More travel guides</h2>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-4">
            {more.map((p) => (
              <li key={p.slug} className="relative flex flex-col gap-2 rounded-2xl border border-line bg-white p-5 transition-shadow hover:shadow-[0_10px_30px_rgba(20,20,20,0.08)]">
                <span className="text-[13px] font-semibold text-graphite">{p.tag}</span>
                <h3 className="text-lg font-bold leading-[1.35] text-ink">
                  <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0 hover:underline">{p.title}</Link>
                </h3>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
