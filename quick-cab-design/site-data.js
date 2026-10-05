// SAMPLE DATA — fares, distances, reviews are placeholders until the client supplies the real fare sheet.
(function () {
  const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');
  const cars = [
    { id: 'hatch', name: 'Hatchback', eg: 'WagonR, Swift or similar', seats: 4, bags: 2, mult: 0.88, ac: true },
    { id: 'sedan', name: 'Sedan', eg: 'Dzire, Etios or similar', seats: 4, bags: 3, mult: 1, ac: true },
    { id: 'suv', name: 'SUV', eg: 'Ertiga, Innova or similar', seats: 6, bags: 4, mult: 1.45, ac: true },
    { id: 'tt', name: 'Tempo Traveller', eg: '12-seater or similar', seats: 12, bags: 8, mult: 2.5, ac: true }
  ];
  const routes = [
    { slug: 'ahmedabad', to: 'Ahmedabad', km: 112, time: '2 hr', via: 'Vadodara–Ahmedabad Expressway (NE1)', sedan: 1999 },
    { slug: 'surat', to: 'Surat', km: 155, time: '3 hr', via: 'NH48 via Bharuch', sedan: 2599 },
    { slug: 'statue-of-unity', to: 'Statue of Unity', km: 90, time: '2 hr', via: 'Dabhoi – Kevadia road', sedan: 1899 },
    { slug: 'rajkot', to: 'Rajkot', km: 300, time: '5 hr 30 min', via: 'Ahmedabad – Bagodara – Limbdi', sedan: 4499 },
    { slug: 'mumbai', to: 'Mumbai', km: 410, time: '7 hr 30 min', via: 'NH48 via Surat, Vapi', sedan: 6999 },
    { slug: 'ahmedabad-airport', to: 'Ahmedabad Airport', km: 120, time: '2 hr', via: 'Expressway (NE1)', sedan: 2199 },
    { slug: 'dwarka-somnath', to: 'Dwarka / Somnath', km: 520, time: '9 hr 30 min', via: 'Rajkot – Jamnagar', sedan: 8499 },
    { slug: 'udaipur', to: 'Udaipur', km: 375, time: '7 hr', via: 'Himmatnagar – Shamlaji', sedan: 6499 },
    { slug: 'bharuch', to: 'Bharuch', km: 75, time: '1 hr 30 min', via: 'NH48', sedan: 1499 },
    { slug: 'anand', to: 'Anand', km: 40, time: '1 hr', via: 'NH48 / Expressway', sedan: 999 },
    { slug: 'gandhinagar', to: 'Gandhinagar', km: 140, time: '2 hr 30 min', via: 'Expressway via Ahmedabad', sedan: 2399 },
    { slug: 'pune', to: 'Pune', km: 560, time: '10 hr', via: 'NH48 – Mumbai–Pune Expressway', sedan: 9499 }
  ];
  routes.forEach(r => {
    r.title = 'Vadodara to ' + r.to + ' cab';
    r.from = inr(r.sedan);
    r.fares = cars.map(c => ({ car: c.name, eg: c.eg, seats: c.seats, bags: c.bags, oneWay: inr(r.sedan * c.mult), round: inr(r.sedan * c.mult * 1.75) }));
    r.href = 'Route.dc.html?to=' + r.slug;
  });
  const cities = ['Vadodara', 'Ahmedabad', 'Surat', 'Statue of Unity', 'Rajkot', 'Mumbai', 'Ahmedabad Airport', 'Vadodara Airport', 'Dwarka / Somnath', 'Udaipur', 'Bharuch', 'Anand', 'Nadiad', 'Gandhinagar', 'Godhra', 'Pune', 'Bhavnagar', 'Jamnagar', 'Vapi', 'Indore'];
  const included = [
    { t: 'Toll charges', d: 'All tolls on the main route' },
    { t: 'State taxes & permits', d: 'Interstate permits where needed' },
    { t: 'Driver allowance', d: 'Including night allowance' },
    { t: 'Fuel', d: 'For the quoted distance' },
    { t: 'GST', d: 'Shown in the final fare' },
    { t: 'No return fare', d: 'One-way trips are priced one way' }
  ];
  const reviews = [
    { name: 'Priya S.', city: 'Vadodara', rating: 5, route: 'Vadodara → Ahmedabad Airport', text: 'Driver was at the door 10 minutes early for a 4 am flight. The fare was exactly what the app showed.' },
    { name: 'Rakesh M.', city: 'Anand', rating: 5, route: 'Vadodara → Statue of Unity', text: 'Clean SUV, polite driver, and he waited while we finished at the viewing gallery. Easy family trip.' },
    { name: 'Nidhi P.', city: 'Surat', rating: 4, route: 'Surat → Vadodara', text: 'Booked on WhatsApp in five minutes. Car was comfortable and the driver knew the highway well.' },
    { name: 'Amit J.', city: 'Mumbai', rating: 5, route: 'Vadodara → Mumbai', text: 'I travel for work every month. Paying only one way makes a real difference. Always on time.' },
    { name: 'Hetal D.', city: 'Vadodara', rating: 5, route: 'Local 8 hr package', text: 'Used the rental for a full day of errands with my parents. Patient driver, no surprises on the bill.' },
    { name: 'Sanjay K.', city: 'Rajkot', rating: 4, route: 'Rajkot → Vadodara', text: 'Good car and fair price. Would like a little more notice of the driver details, but overall very good.' }
  ];
  const faqs = [
    { q: 'How do I book a one way cab?', a: 'Choose your pickup and drop city, pick a date and time, and tap Check Fare. Pick a car, add your details and confirm. You can also book by calling or messaging 6356-544-544 on WhatsApp.' },
    { q: 'How much luggage can I carry?', a: 'Hatchbacks fit about 2 medium bags, sedans 3, SUVs 4, and a Tempo Traveller around 8. Tell us when booking if you carry extra luggage and we will suggest the right car.' },
    { q: 'What payment options do you accept?', a: 'You can pay online when booking, or pay the driver by UPI or cash at the end of the trip. [CONFIRM WITH CLIENT]' },
    { q: 'Are tolls and taxes included in the fare?', a: 'The fare shown includes tolls, state taxes and driver allowance on the main route. Parking and any extra stops you request are paid separately. [CONFIRM WITH CLIENT]' },
    { q: 'What is your cancellation policy?', a: 'Cancel free of charge up to a set time before pickup. Later cancellations may carry a small fee. The exact terms are shown before you confirm. [CONFIRM WITH CLIENT]' },
    { q: 'Do you run cabs at night?', a: 'Yes. We run 24x7, including early-morning airport pickups and late-night drops.' },
    { q: 'Can you pick me up from the airport?', a: 'Yes. Share your flight number when booking and the driver will track your arrival and wait at the pickup point.' },
    { q: 'When will I get the driver details?', a: 'You receive the driver name, phone number and car number by SMS and WhatsApp before your pickup time.' },
    { q: 'What is the difference between one way and round trip?', a: 'A one-way trip takes you from A to B and you pay for that distance only. A round trip brings you back, and the driver stays with you for the days you choose.' },
    { q: 'Can I change my booking?', a: 'Yes. Call or WhatsApp us with your booking ID to change the time, pickup address or car, subject to availability.' }
  ];
  const posts = [
    { slug: 'statue-of-unity-day-trip', tag: 'Travel guide', title: 'Statue of Unity day trip from Vadodara: timings, route and tips', date: '12 Sep 2026', read: '6 min read', excerpt: 'Leave by 7 am, carry your ticket on your phone, and plan the valley of flowers for the afternoon.' },
    { slug: 'vadodara-to-ahmedabad-airport', tag: 'Airport', title: 'How early should you leave Vadodara for an Ahmedabad Airport flight?', date: '28 Aug 2026', read: '4 min read', excerpt: 'Expressway timings, check-in buffers and what changes for early-morning international flights.' },
    { slug: 'one-way-vs-round-trip', tag: 'Fares', title: 'One way vs round trip: which fare makes sense for your trip?', date: '9 Aug 2026', read: '5 min read', excerpt: 'If you are not coming back the same day, a one-way fare usually costs less. Here is how to decide.' },
    { slug: 'dwarka-somnath-itinerary', tag: 'Travel guide', title: 'A 3-day Dwarka and Somnath itinerary by road', date: '21 Jul 2026', read: '8 min read', excerpt: 'Where to stop between Rajkot and Jamnagar, temple timings, and the best order to visit.' }
  ];
  if (!customElements.get('qc-icon')) {
    const cache = {};
    const load = n => cache[n] || (cache[n] = fetch('https://unpkg.com/lucide-static@0.460.0/icons/' + n + '.svg').then(r => r.text()).catch(() => ''));
    customElements.define('qc-icon', class extends HTMLElement {
      static get observedAttributes() { return ['name', 'size', 'fill']; }
      connectedCallback() { this.render(); }
      attributeChangedCallback() { this.render(); }
      render() {
        const n = this.getAttribute('name'); if (!n) return;
        const s = this.getAttribute('size') || '20';
        this.style.width = s + 'px'; this.style.height = s + 'px';
        if (!this.style.display) this.style.display = 'inline-flex';
        this.style.flex = 'none';
        this.setAttribute('aria-hidden', 'true');
        const key = n + s + this.getAttribute('fill');
        if (this._k === key) return; this._k = key;
        load(n).then(t => {
          if (this._k !== key) return;
          const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
          root.innerHTML = t;
          const svg = root.querySelector('svg'); if (!svg) return;
          svg.setAttribute('width', s); svg.setAttribute('height', s); svg.setAttribute('stroke-width', '1.75');
          if (this.getAttribute('fill')) svg.setAttribute('fill', 'currentColor');
          svg.style.display = 'block';
        });
      }
    });
  }
  window.QC = { inr, cars, routes, cities, included, reviews, faqs, posts, phone: '6356-544-544', tel: 'tel:+916356544544', wa: 'https://wa.me/916356544544', email: 'info@thequickcab.com' };
})();
