import type { MetadataRoute } from "next";
import { posts, routes, SITE_URL } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/", "/routes", "/airport-taxi", "/reviews", "/faq", "/blog",
    ...routes.map((r) => r.href),
    ...posts.map((p) => `/blog/${p.slug}`),
  ];
  return paths.map((p) => ({ url: SITE_URL + p }));
}
