# The Quick Cab — website

Next.js (App Router) + Tailwind CSS build of the Quick Cab design in `quick-cab-design/`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

- Pages: `src/app` — home, `/routes`, `/routes/[slug]`, `/airport-taxi`, `/booking`, `/reviews`, `/faq`, `/blog`, `/blog/[slug]`
- Shared UI: `src/components`
- All fares, routes, reviews, FAQs and blog posts: `src/lib/site-data.ts` (sample data — replace before launch)
- Photos in `public/images` are CC0 / public-domain placeholders from Wikimedia Commons, WordPress Photos and rawpixel
- Set `NEXT_PUBLIC_SITE_URL` to the live domain for canonical URLs and the sitemap
