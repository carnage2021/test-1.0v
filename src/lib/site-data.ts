// SAMPLE DATA — fares, distances, reviews and the rating are placeholders
// until the client supplies the real fare sheet and Google reviews.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://thequickcab.com";

export const contact = {
  phone: "6356-544-544",
  tel: "tel:+916356544544",
  wa: "https://wa.me/916356544544",
  email: "info@thequickcab.com",
  mailto: "mailto:info@thequickcab.com",
};

export const waLink = (text: string) => `${contact.wa}?text=${encodeURIComponent(text)}`;

export const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

export type Car = {
  id: string;
  name: string;
  eg: string;
  seats: number;
  bags: number;
  mult: number;
  image: string;
};

export const cars: Car[] = [
  { id: "hatch", name: "Hatchback", eg: "WagonR, Swift or similar", seats: 4, bags: 2, mult: 0.88, image: "/images/car-hatchback.jpg" },
  { id: "sedan", name: "Sedan", eg: "Dzire, Etios or similar", seats: 4, bags: 3, mult: 1, image: "/images/car-sedan.jpg" },
  { id: "suv", name: "SUV", eg: "Ertiga, Innova or similar", seats: 6, bags: 4, mult: 1.45, image: "/images/car-suv.jpg" },
  { id: "tt", name: "Tempo Traveller", eg: "12-seater or similar", seats: 12, bags: 8, mult: 2.5, image: "/images/car-tempo-traveller.jpg" },
];

export const ROUND_TRIP_MULT = 1.75;

export type Fare = { car: string; eg: string; seats: number; bags: number; oneWay: string; round: string };

export type Route = {
  slug: string;
  to: string;
  km: number;
  time: string;
  via: string;
  sedan: number;
  title: string;
  from: string;
  href: string;
  fares: Fare[];
};

const rawRoutes = [
  { slug: "ahmedabad", to: "Ahmedabad", km: 112, time: "2 hr", via: "Vadodara–Ahmedabad Expressway (NE1)", sedan: 1999 },
  { slug: "surat", to: "Surat", km: 155, time: "3 hr", via: "NH48 via Bharuch", sedan: 2599 },
  { slug: "statue-of-unity", to: "Statue of Unity", km: 90, time: "2 hr", via: "Dabhoi – Kevadia road", sedan: 1899 },
  { slug: "rajkot", to: "Rajkot", km: 300, time: "5 hr 30 min", via: "Ahmedabad – Bagodara – Limbdi", sedan: 4499 },
  { slug: "mumbai", to: "Mumbai", km: 410, time: "7 hr 30 min", via: "NH48 via Surat, Vapi", sedan: 6999 },
  { slug: "ahmedabad-airport", to: "Ahmedabad Airport", km: 120, time: "2 hr", via: "Expressway (NE1)", sedan: 2199 },
  { slug: "dwarka-somnath", to: "Dwarka / Somnath", km: 520, time: "9 hr 30 min", via: "Rajkot – Jamnagar", sedan: 8499 },
  { slug: "udaipur", to: "Udaipur", km: 375, time: "7 hr", via: "Himmatnagar – Shamlaji", sedan: 6499 },
  { slug: "bharuch", to: "Bharuch", km: 75, time: "1 hr 30 min", via: "NH48", sedan: 1499 },
  { slug: "anand", to: "Anand", km: 40, time: "1 hr", via: "NH48 / Expressway", sedan: 999 },
  { slug: "gandhinagar", to: "Gandhinagar", km: 140, time: "2 hr 30 min", via: "Expressway via Ahmedabad", sedan: 2399 },
  { slug: "pune", to: "Pune", km: 560, time: "10 hr", via: "NH48 – Mumbai–Pune Expressway", sedan: 9499 },
];

export const routes: Route[] = rawRoutes.map((r) => ({
  ...r,
  title: `Vadodara to ${r.to} cab`,
  from: inr(r.sedan),
  href: `/routes/${r.slug}`,
  fares: cars.map((c) => ({
    car: c.name,
    eg: c.eg,
    seats: c.seats,
    bags: c.bags,
    oneWay: inr(r.sedan * c.mult),
    round: inr(r.sedan * c.mult * ROUND_TRIP_MULT),
  })),
}));

export const HOME_CITY = "Vadodara";

export const cities = [
  "Vadodara", "Ahmedabad", "Surat", "Statue of Unity", "Rajkot", "Mumbai", "Ahmedabad Airport",
  "Vadodara Airport", "Dwarka / Somnath", "Udaipur", "Bharuch", "Anand", "Nadiad", "Gandhinagar",
  "Godhra", "Pune", "Bhavnagar", "Jamnagar", "Vapi", "Indore",
];

/** Route between two cities when one end is Vadodara and the other is a listed route. */
export function findRoute(a: string, b: string) {
  const other = a === HOME_CITY ? b : b === HOME_CITY ? a : null;
  return other ? routes.find((r) => r.to === other) : undefined;
}

// Local rental packages: hours, included km, hatchback base fare.
export const rentalPackages = [
  { hours: 4, km: 40, base: 1199 },
  { hours: 8, km: 80, base: 1999 },
  { hours: 12, km: 120, base: 2799 },
];

export const rentalFare = (base: number, car: Car) => (base * car.mult) / cars[0].mult;

export const included = [
  { t: "Toll charges", d: "All tolls on the main route" },
  { t: "State taxes & permits", d: "Interstate permits where needed" },
  { t: "Driver allowance", d: "Including night allowance" },
  { t: "Fuel", d: "For the quoted distance" },
  { t: "GST", d: "Shown in the final fare" },
  { t: "No return fare", d: "One-way trips are priced one way" },
];

export const rating = { value: "4.8", label: "4.8 out of 5 stars" };

export type Review = { name: string; city: string; rating: number; route: string; text: string };

export const reviews: Review[] = [
  { name: "Priya S.", city: "Vadodara", rating: 5, route: "Vadodara → Ahmedabad Airport", text: "Driver was at the door 10 minutes early for a 4 am flight. The fare was exactly what the app showed." },
  { name: "Rakesh M.", city: "Anand", rating: 5, route: "Vadodara → Statue of Unity", text: "Clean SUV, polite driver, and he waited while we finished at the viewing gallery. Easy family trip." },
  { name: "Nidhi P.", city: "Surat", rating: 4, route: "Surat → Vadodara", text: "Booked on WhatsApp in five minutes. Car was comfortable and the driver knew the highway well." },
  { name: "Amit J.", city: "Mumbai", rating: 5, route: "Vadodara → Mumbai", text: "I travel for work every month. Paying only one way makes a real difference. Always on time." },
  { name: "Hetal D.", city: "Vadodara", rating: 5, route: "Local 8 hr package", text: "Used the rental for a full day of errands with my parents. Patient driver, no surprises on the bill." },
  { name: "Sanjay K.", city: "Rajkot", rating: 4, route: "Rajkot → Vadodara", text: "Good car and fair price. Would like a little more notice of the driver details, but overall very good." },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  { q: "How do I book a one way cab?", a: "Choose your pickup and drop city, pick a date and time, and tap Check Fare. Pick a car, add your details and confirm. You can also book by calling or messaging 6356-544-544 on WhatsApp." },
  { q: "How much luggage can I carry?", a: "Hatchbacks fit about 2 medium bags, sedans 3, SUVs 4, and a Tempo Traveller around 8. Tell us when booking if you carry extra luggage and we will suggest the right car." },
  { q: "What payment options do you accept?", a: "You can pay online when booking, or pay the driver by UPI or cash at the end of the trip." },
  { q: "Are tolls and taxes included in the fare?", a: "The fare shown includes tolls, state taxes and driver allowance on the main route. Parking and any extra stops you request are paid separately." },
  { q: "What is your cancellation policy?", a: "Cancel free of charge up to a set time before pickup. Later cancellations may carry a small fee. The exact terms are shown before you confirm." },
  { q: "Do you run cabs at night?", a: "Yes. We run 24x7, including early-morning airport pickups and late-night drops." },
  { q: "Can you pick me up from the airport?", a: "Yes. Share your flight number when booking and the driver will track your arrival and wait at the pickup point." },
  { q: "When will I get the driver details?", a: "You receive the driver name, phone number and car number by SMS and WhatsApp before your pickup time." },
  { q: "What is the difference between one way and round trip?", a: "A one-way trip takes you from A to B and you pay for that distance only. A round trip brings you back, and the driver stays with you for the days you choose." },
  { q: "Can I change my booking?", a: "Yes. Call or WhatsApp us with your booking ID to change the time, pickup address or car, subject to availability." },
];

export const faqGroups = [
  { title: "Booking and changes", items: [0, 8, 9].map((i) => faqs[i]) },
  { title: "Fares and payment", items: [3, 2, 4].map((i) => faqs[i]) },
  { title: "On the trip", items: [1, 5, 6, 7].map((i) => faqs[i]) },
];

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "cta"; routeSlug: string };

export type Post = {
  slug: string;
  tag: string;
  title: string;
  crumb: string;
  date: string;
  isoDate: string;
  read: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  routeSlug: string;
  body: Block[];
};

export const posts: Post[] = [
  {
    slug: "statue-of-unity-day-trip",
    tag: "Travel guide",
    title: "Statue of Unity day trip from Vadodara: timings, route and tips",
    crumb: "Statue of Unity day trip",
    date: "12 Sep 2026",
    isoDate: "2026-09-12",
    read: "6 min read",
    excerpt: "Leave by 7 am, carry your ticket on your phone, and plan the valley of flowers for the afternoon.",
    image: "/images/blog-statue-of-unity.jpg",
    imageAlt: "Statue of Unity at Kevadia at dusk",
    routeSlug: "statue-of-unity",
    body: [
      { type: "p", text: "The Statue of Unity at Kevadia is about 90 km from Vadodara, a two-hour drive through Dabhoi. You can see the statue, the viewing gallery and one or two nearby attractions in a single day if you start early." },
      { type: "h2", text: "When to leave Vadodara" },
      { type: "p", text: "Leave by 7 am to reach as the ticket counters open and before tour buses arrive. The statue is closed on Mondays, so plan for another day of the week." },
      { type: "h2", text: "What to see in one day" },
      { type: "h3", text: "Viewing gallery" },
      { type: "p", text: "Book the viewing gallery slot online. Morning slots have shorter queues and clearer views of the Sardar Sarovar dam." },
      { type: "h3", text: "Valley of Flowers and Jungle Safari" },
      { type: "p", text: "Both are a short drive from the statue. Your driver waits at each stop, so you do not need to arrange local transport." },
      { type: "cta", routeSlug: "statue-of-unity" },
      { type: "h2", text: "One way or round trip?" },
      { type: "p", text: "If you are coming back the same evening, a round trip keeps the car and driver with you all day. If you are staying overnight at Kevadia, book one way and pay for the drive there only." },
      { type: "h2", text: "Quick checklist" },
      { type: "ul", items: ["Tickets booked online, saved on your phone", "Water, a cap and comfortable shoes", "ID for every adult in the group"] },
    ],
  },
  {
    slug: "vadodara-to-ahmedabad-airport",
    tag: "Airport",
    title: "How early should you leave Vadodara for an Ahmedabad Airport flight?",
    crumb: "Leaving for Ahmedabad Airport",
    date: "28 Aug 2026",
    isoDate: "2026-08-28",
    read: "4 min read",
    excerpt: "Expressway timings, check-in buffers and what changes for early-morning international flights.",
    image: "/images/blog-airport.jpg",
    imageAlt: "Airport terminal building on a clear day",
    routeSlug: "ahmedabad-airport",
    body: [
      { type: "p", text: "Ahmedabad Airport is about 120 km from Vadodara. On the Expressway the drive takes around two hours, but the right time to leave depends on your flight and the hour you travel." },
      { type: "h2", text: "Work backwards from your flight" },
      { type: "p", text: "Start with the time you need to be at the terminal: two hours before a domestic departure and three hours before an international one. Add the two-hour drive, then a buffer of 30 to 45 minutes for city traffic at both ends." },
      { type: "ul", items: ["Domestic flight: leave Vadodara about 4 hr 30 min before departure", "International flight: leave about 5 hr 30 min before departure", "Monsoon or festival weekends: add another 30 minutes"] },
      { type: "h2", text: "Early-morning flights" },
      { type: "p", text: "Roads are clear before 6 am, so the drive is at its quickest. We run 24x7, and 2 am or 3 am pickups are routine. Book the evening before so your driver details reach you before you sleep." },
      { type: "cta", routeSlug: "ahmedabad-airport" },
      { type: "h2", text: "Share your flight number" },
      { type: "p", text: "Add your flight number when you book. If the airline changes the departure time, call or WhatsApp us and we will move the pickup to match." },
    ],
  },
  {
    slug: "one-way-vs-round-trip",
    tag: "Fares",
    title: "One way vs round trip: which fare makes sense for your trip?",
    crumb: "One way vs round trip",
    date: "9 Aug 2026",
    isoDate: "2026-08-09",
    read: "5 min read",
    excerpt: "If you are not coming back the same day, a one-way fare usually costs less. Here is how to decide.",
    image: "/images/blog-taxi-night.jpg",
    imageAlt: "Illuminated taxi sign on a car roof at night",
    routeSlug: "ahmedabad",
    body: [
      { type: "p", text: "Both fares take you to the same place. The difference is what happens to the car after it drops you, and that is what decides which one costs less for your plan." },
      { type: "h2", text: "How a one-way fare works" },
      { type: "p", text: "You pay for the distance from pickup to drop and nothing else. The car does not wait for you, and you are not charged for its drive back to Vadodara." },
      { type: "h2", text: "How a round-trip fare works" },
      { type: "p", text: "The same car and driver stay with you for the whole trip and bring you back. The fare covers the total distance and the days you keep the car." },
      { type: "h2", text: "Which one should you book?" },
      { type: "ul", items: ["Not coming back the same day: one way usually costs less", "Returning the same evening with several stops: round trip is simpler", "Different return date not fixed yet: book one way now and another one way later"] },
      { type: "cta", routeSlug: "ahmedabad" },
      { type: "p", text: "Not sure? Check both fares in the booking form. Switching between One Way and Round Trip shows the fare for each before you confirm anything." },
    ],
  },
  {
    slug: "dwarka-somnath-itinerary",
    tag: "Travel guide",
    title: "A 3-day Dwarka and Somnath itinerary by road",
    crumb: "Dwarka and Somnath itinerary",
    date: "21 Jul 2026",
    isoDate: "2026-07-21",
    read: "8 min read",
    excerpt: "Where to stop between Rajkot and Jamnagar, temple timings, and the best order to visit.",
    image: "/images/blog-dwarka.jpg",
    imageAlt: "Dwarkadhish Temple lit up at night",
    routeSlug: "dwarka-somnath",
    body: [
      { type: "p", text: "Dwarka and Somnath sit on the Saurashtra coast, a long day's drive from Vadodara. Three days gives you time for both temples without rushing, with one night in each town." },
      { type: "h2", text: "Day 1: Vadodara to Dwarka" },
      { type: "p", text: "Leave by 6 am. The route runs through Rajkot and Jamnagar and takes about nine and a half hours with breaks. Rajkot is the natural lunch stop, and Jamnagar works well for tea before the final stretch." },
      { type: "h2", text: "Day 2: Dwarka, then the coast road to Somnath" },
      { type: "p", text: "Visit Dwarkadhish Temple for the morning darshan, then drive south along the coast through Porbandar. Dwarka to Somnath is roughly 230 km and takes four to five hours." },
      { type: "h3", text: "Temple timings" },
      { type: "p", text: "Both temples close for part of the afternoon and timings change on festival days. Check the current schedule before you set out each morning." },
      { type: "cta", routeSlug: "dwarka-somnath" },
      { type: "h2", text: "Day 3: Somnath and the drive home" },
      { type: "p", text: "Attend the morning aarti at Somnath, have breakfast, and start back by 10 am. The return to Vadodara is the longest leg, so plan a proper meal stop around Rajkot." },
      { type: "h2", text: "Which car to book" },
      { type: "ul", items: ["Up to 4 people with light luggage: sedan", "Families of 5 or 6: SUV", "Larger groups: Tempo Traveller, with room for everyone's bags"] },
    ],
  },
];
