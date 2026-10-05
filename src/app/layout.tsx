import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/site-data";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "One Way Cab Service in Vadodara | Fixed Fares | The Quick Cab",
    template: "%s | The Quick Cab",
  },
  description: "Book one way intercity cabs from Vadodara, 24x7. Fixed fares, no return charges. Call or WhatsApp 6356-544-544.",
  openGraph: {
    type: "website",
    siteName: "The Quick Cab",
    locale: "en_IN",
    images: [{ url: "/images/hero-expressway-night.jpg", width: 1920, height: 1080, alt: "Vadodara–Ahmedabad Expressway at night" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#1E1E1E",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={poppins.variable}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-3 focus:font-semibold focus:text-ink">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
