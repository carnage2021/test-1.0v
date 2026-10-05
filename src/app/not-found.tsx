import Link from "next/link";
import PageHero from "@/components/PageHero";
import { contact } from "@/lib/site-data";

export default function NotFound() {
  return (
    <main id="main">
      <PageHero crumbs={[{ label: "Page not found" }]} className="pb-[clamp(72px,10vw,128px)] pt-[88px]">
        <div className="flex max-w-[640px] flex-col items-start gap-4 pt-6">
          <h1 className="h1-page">We couldn’t find that page</h1>
          <p className="text-[17px] leading-[1.6]">The link may be old or mistyped. You can check a fare from the home page, or call us on {contact.phone}.</p>
          <div className="mt-2 flex flex-wrap gap-2.5">
            <Link href="/" className="flex h-[52px] items-center rounded-[10px] bg-brand px-6 font-bold text-ink transition-colors hover:bg-brand-dark">Back to home</Link>
            <Link href="/routes" className="flex h-[52px] items-center rounded-[10px] border-[1.5px] border-white px-6 font-semibold text-white transition-colors hover:bg-white hover:text-ink">Routes and fares</Link>
          </div>
        </div>
      </PageHero>
    </main>
  );
}
