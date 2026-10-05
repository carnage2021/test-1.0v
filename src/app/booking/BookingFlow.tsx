"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Check, CircleCheck, LoaderCircle, Luggage, MessageCircle, Pencil, Users } from "lucide-react";
import { cars, contact, findRoute, included, inr, rentalFare, rentalPackages, ROUND_TRIP_MULT, waLink } from "@/lib/site-data";

type Step = "results" | "details" | "done";
type TripType = "oneway" | "round" | "rental";
type Form = { name: string; phone: string; email: string; flight: string; pick: string; drop: string };
type Errs = Partial<Record<"name" | "phone" | "email" | "pick", string>>;

const ORDER: Step[] = ["results", "details", "done"];
const STEP_LABELS = ["Choose car", "Your details", "Send booking"];
const TYPE_LABEL: Record<TripType, string> = { oneway: "One way", round: "Round trip", rental: "Rental" };
const PAYMENTS = [
  { id: "online", label: "Pay online", sub: "UPI, card or net banking — we send a payment link" },
  { id: "driver", label: "Pay the driver", sub: "UPI or cash after the trip" },
];
// Fallback sedan fare for city pairs that are not on the published route list.
const DEFAULT_SEDAN_FARE = 2499;

const formatTime = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return t;
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
};
const formatDay = (iso: string) => new Date(`${iso}T00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short" });

const labelCls = "text-sm font-semibold text-ink";
const errCls = "text-sm text-danger";
const optional = "font-normal text-muted";
const panel = "rounded-2xl border border-line bg-white";

export default function BookingFlow() {
  const params = useSearchParams();
  const tripParam = params.get("trip");
  const tripType: TripType = tripParam === "round" || tripParam === "rental" ? tripParam : "oneway";
  const from = params.get("from") || "Vadodara";
  const to = params.get("to") || "Ahmedabad";
  const time = params.get("time") || "09:00";
  const ret = params.get("ret") || "";

  const [step, setStep] = useState<Step>("results");
  const [carName, setCarName] = useState(() => {
    const wanted = params.get("car");
    return cars.some((c) => c.name === wanted) ? wanted! : "Sedan";
  });
  const [pay, setPay] = useState("driver");
  const [f, setF] = useState<Form>({ name: "", phone: "", email: "", flight: "", pick: "", drop: "" });
  const [errs, setErrs] = useState<Errs>({});
  const [loading, setLoading] = useState(false);
  const [ref, setRef] = useState("");
  // Without a date in the URL, default to tomorrow (fixed once so it can't drift between renders).
  const [date] = useState(() => {
    const d = params.get("date");
    if (d && !Number.isNaN(new Date(`${d}T00:00`).getTime())) return d;
    const t = new Date(Date.now() + 864e5);
    return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
  });

  const when = `${formatDay(date)}, ${formatTime(time)}`;
  const typeLabel = TYPE_LABEL[tripType];
  const pkg = tripType === "rental" ? rentalPackages.find((p) => to.includes(`${p.hours} hr`)) ?? rentalPackages[1] : null;
  const sedanFare = findRoute(from, to)?.sedan ?? DEFAULT_SEDAN_FARE;
  const fareFor = (c: (typeof cars)[number]) =>
    inr(pkg ? rentalFare(pkg.base, c) : sedanFare * c.mult * (tripType === "round" ? ROUND_TRIP_MULT : 1));
  const note = tripType === "oneway" ? "No return fare" : "All-inclusive";
  const sel = cars.find((c) => c.name === carName) ?? cars[1];
  const selFare = fareFor(sel);
  const idx = ORDER.indexOf(step);

  const go = (s: Step) => {
    setStep(s);
    window.scrollTo(0, 0);
  };

  const setField = (k: keyof Form) => (ev: ChangeEvent<HTMLInputElement>) => {
    const v = ev.target.value;
    setF((s) => ({ ...s, [k]: k === "phone" ? v.replace(/\D/g, "").slice(0, 10) : v }));
    setErrs((s) => ({ ...s, [k]: undefined }));
  };

  const confirm = (ev: FormEvent) => {
    ev.preventDefault();
    const next: Errs = {};
    if (!f.name.trim()) next.name = "Enter your name";
    if (f.phone.length !== 10) next.phone = "Enter a 10-digit mobile number";
    if (f.email.trim() && !/^\S+@\S+\.\S+$/.test(f.email.trim())) next.email = "Enter a valid email address";
    if (!f.pick.trim()) next.pick = "Enter a pickup address";
    setErrs(next);
    if (Object.keys(next).length) {
      document.getElementById(`pd-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    setLoading(true);
    setRef(`QC-${date.slice(2, 4)}-${Math.floor(10000 + Math.random() * 90000)}`);
    setTimeout(() => {
      setLoading(false);
      go("done");
    }, 500);
  };

  const message = [
    `New booking ${ref}`,
    `Trip: ${typeLabel}, ${from} to ${to}`,
    `Pickup: ${when}${ret ? ` (return ${formatDay(ret)})` : ""}`,
    `Car: ${sel.name}, ${selFare}`,
    `Name: ${f.name.trim()}`,
    `Mobile: +91 ${f.phone}`,
    f.email.trim() && `Email: ${f.email.trim()}`,
    f.flight.trim() && `Flight: ${f.flight.trim().toUpperCase()}`,
    `Pickup address: ${f.pick.trim()}`,
    f.drop.trim() && `Drop address: ${f.drop.trim()}`,
    `Payment: ${PAYMENTS.find((p) => p.id === pay)?.label}`,
  ].filter(Boolean).join("\n");

  return (
    <main id="main" className="wrap pb-[clamp(56px,8vw,96px)] pt-[92px]">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[20px] px-5 py-4 text-fog shadow-[0_20px_50px_rgba(22,22,22,0.25)]" style={{ background: "radial-gradient(60% 120% at 100% 0%,rgba(255,187,3,0.18),transparent 70%),#161616" }}>
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <span className="text-[17px] font-bold text-white">{from}</span>
          <span aria-hidden="true" className="w-10 border-t-2 border-dashed border-[#444444]" />
          <span className="text-[17px] font-bold text-white">{to}</span>
          <span className="text-sm tabular-nums">· {when} · {typeLabel}</span>
        </div>
        {step !== "done" && (
          <Link href="/#booking-card" className="flex h-10 items-center gap-1.5 rounded-[10px] border border-[#444444] px-4 text-sm font-semibold text-white transition-colors hover:border-brand">
            <Pencil size={16} />
            Edit trip
          </Link>
        )}
      </div>

      <ol aria-label="Booking steps" className="mb-7 mt-6 flex flex-wrap gap-2">
        {STEP_LABELS.map((label, i) => (
          <li
            key={label}
            aria-current={i === idx ? "step" : undefined}
            className={`flex h-10 items-center gap-2 rounded-[10px] pl-1.5 pr-4 text-sm font-semibold ${i === idx ? "bg-white" : ""} ${i <= idx ? "text-ink" : "text-muted"}`}
          >
            <span className={`grid size-7 place-items-center rounded-full text-[13px] font-bold text-ink ${i <= idx ? "bg-brand" : "bg-line"}`}>
              {i < idx ? <Check size={15} /> : i + 1}
            </span>
            {label}
          </li>
        ))}
      </ol>

      {step === "results" && (
        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 min-[980px]:grid-cols-[minmax(0,1fr)_360px]">
          <section aria-labelledby="h1" className="flex min-w-0 flex-col gap-3.5">
            <h1 id="h1" className="mb-1 text-[clamp(26px,3vw,36px)] font-bold leading-[1.15] tracking-[-0.02em] text-ink">Pick your car</h1>
            <div role="radiogroup" aria-labelledby="h1" className="flex flex-col gap-3">
              {cars.map((c) => {
                const on = c.name === sel.name;
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setCarName(c.name)}
                    className={`grid w-full grid-cols-[96px_minmax(0,1fr)] items-center gap-x-5 gap-y-4 rounded-2xl border-2 bg-white p-4 text-left transition-[border-color,box-shadow] hover:border-graphite min-[640px]:grid-cols-[150px_minmax(0,1fr)_auto] ${on ? "border-ink shadow-[0_8px_24px_rgba(20,20,20,0.10)]" : "border-line"}`}
                  >
                    <span className="relative block aspect-[16/10] overflow-hidden rounded-[10px] bg-chip">
                      <Image src={c.image} alt={`${c.name} cab`} fill sizes="150px" className="object-cover" />
                    </span>
                    <span className="flex min-w-0 flex-col gap-1.5">
                      <span className="text-[19px] font-bold text-ink">{c.name}</span>
                      <span className="text-sm text-muted">{c.eg} · AC</span>
                      <span className="flex flex-wrap gap-x-3.5 gap-y-1 text-sm font-medium text-ink">
                        <span className="flex items-center gap-1.5"><Users size={16} className="text-muted" />{c.seats} seats</span>
                        <span className="flex items-center gap-1.5"><Luggage size={16} className="text-muted" />{c.bags} bags</span>
                      </span>
                    </span>
                    <span className="col-span-full flex items-center justify-between gap-1.5 min-[640px]:col-span-1 min-[640px]:flex-col min-[640px]:items-end">
                      <span className="flex flex-col gap-1.5 min-[640px]:items-end">
                        <span className="text-2xl font-bold leading-none tabular-nums text-ink">{fareFor(c)}</span>
                        <span className="text-[13px] font-semibold text-ok-text">{note}</span>
                      </span>
                      <span className={`flex h-9 items-center gap-1.5 rounded-[10px] px-3.5 text-sm font-bold text-ink ${on ? "bg-brand" : "bg-chip"}`}>
                        {on && <Check size={15} />}
                        {on ? "Selected" : "Select"}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
          <aside aria-label="Fare summary" className={`${panel} flex flex-col gap-4 p-6 min-[980px]:sticky min-[980px]:top-24`}>
            <h2 className="text-lg font-bold text-ink">Fare summary</h2>
            <div className="flex items-baseline justify-between gap-3">
              <span>{sel.name}, {typeLabel}</span>
              <span className="text-[28px] font-bold tabular-nums text-ink">{selFare}</span>
            </div>
            <ul className="flex flex-col gap-2.5 border-t border-line pt-4 text-sm">
              {included.slice(0, 5).map((i) => (
                <li key={i.t} className="flex items-center gap-2"><Check size={16} className="text-ok" />{i.t}</li>
              ))}
            </ul>
            <button type="button" onClick={() => go("details")} className="h-[52px] rounded-full bg-brand font-bold text-ink transition-colors hover:bg-brand-dark">
              Continue with {sel.name}
            </button>
          </aside>
        </div>
      )}

      {step === "details" && (
        <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-6 min-[980px]:grid-cols-[minmax(0,1fr)_360px]">
          <form onSubmit={confirm} noValidate aria-labelledby="h1d" className={`${panel} flex flex-col gap-5 p-[clamp(20px,3vw,32px)]`}>
            <h1 id="h1d" className="text-[clamp(26px,3vw,36px)] font-bold leading-[1.15] tracking-[-0.02em] text-ink">Passenger details</h1>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="pd-name" className={labelCls}>Full name</label>
                <input id="pd-name" autoComplete="name" value={f.name} onChange={setField("name")} aria-invalid={!!errs.name} className="qc-input" />
                {errs.name && <p role="alert" className={errCls}>{errs.name}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="pd-phone" className={labelCls}>Mobile number</label>
                <div className={`flex h-[52px] overflow-hidden rounded-xl border-[1.5px] bg-white transition-[border-color,box-shadow] focus-within:border-graphite focus-within:shadow-[0_0_0_4px_rgba(255,187,3,0.14)] ${errs.phone ? "border-danger" : "border-line"}`}>
                  <span className="flex items-center border-r border-line bg-page px-3 font-semibold text-ink">+91</span>
                  <input id="pd-phone" type="tel" inputMode="numeric" autoComplete="tel-national" value={f.phone} onChange={setField("phone")} aria-invalid={!!errs.phone} className="min-w-0 flex-1 px-3.5 font-medium tabular-nums text-ink outline-none" />
                </div>
                {errs.phone && <p role="alert" className={errCls}>{errs.phone}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="pd-email" className={labelCls}>Email <span className={optional}>(optional, for invoice)</span></label>
                <input id="pd-email" type="email" autoComplete="email" value={f.email} onChange={setField("email")} aria-invalid={!!errs.email} className="qc-input" />
                {errs.email && <p role="alert" className={errCls}>{errs.email}</p>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="pd-flight" className={labelCls}>Flight number <span className={optional}>(airport pickups)</span></label>
                <input id="pd-flight" value={f.flight} onChange={setField("flight")} className="qc-input uppercase" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="pd-pick" className={labelCls}>Pickup address in {from}</label>
              <input id="pd-pick" autoComplete="street-address" value={f.pick} onChange={setField("pick")} aria-invalid={!!errs.pick} className="qc-input" />
              {errs.pick && <p role="alert" className={errCls}>{errs.pick}</p>}
            </div>
            {tripType !== "rental" && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="pd-drop" className={labelCls}>Drop address in {to} <span className={optional}>(optional)</span></label>
                <input id="pd-drop" value={f.drop} onChange={setField("drop")} className="qc-input" />
              </div>
            )}
            <fieldset className="flex flex-col gap-2.5">
              <legend className={`${labelCls} mb-2`}>Payment</legend>
              {PAYMENTS.map((p) => (
                <label key={p.id} className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border-2 bg-white px-4 py-2 transition-colors ${pay === p.id ? "border-ink" : "border-line"}`}>
                  <input type="radio" name="pay" checked={pay === p.id} onChange={() => setPay(p.id)} className="size-5 accent-ink" />
                  <span className="flex flex-col">
                    <span className="font-semibold text-ink">{p.label}</span>
                    <span className="text-[13px] text-muted">{p.sub}</span>
                  </span>
                </label>
              ))}
            </fieldset>
            <div className="flex flex-wrap items-center gap-2.5">
              <button type="submit" disabled={loading} className="flex h-14 items-center gap-2.5 rounded-[10px] bg-brand px-8 text-[17px] font-bold text-ink transition-colors hover:bg-brand-dark disabled:opacity-80">
                {loading && <LoaderCircle size={18} className="animate-[qcSpin_0.9s_linear_infinite]" />}
                {loading ? "Confirming…" : `Confirm booking · ${selFare}`}
              </button>
              <button type="button" onClick={() => setStep("results")} className="h-14 rounded-[10px] px-5 font-semibold text-graphite underline underline-offset-4 hover:text-ink">Change car</button>
            </div>
            <p className="text-[13px] text-muted">By confirming you agree to the <a href="#terms" className="link">Terms</a> and <a href="#privacy" className="link">Privacy policy</a>.</p>
          </form>
          <aside aria-label="Trip summary" className={`${panel} flex flex-col gap-3 p-6 min-[980px]:sticky min-[980px]:top-24`}>
            <h2 className="text-lg font-bold text-ink">Your trip</h2>
            <dl className="flex flex-col gap-2.5 text-[15px]">
              <div className="flex justify-between gap-3"><dt className="text-muted">Route</dt><dd className="text-right font-semibold text-ink">{from} → {to}</dd></div>
              <div className="flex justify-between gap-3"><dt className="text-muted">Pickup</dt><dd className="font-semibold tabular-nums text-ink">{when}</dd></div>
              {ret && <div className="flex justify-between gap-3"><dt className="text-muted">Return</dt><dd className="font-semibold tabular-nums text-ink">{formatDay(ret)}</dd></div>}
              <div className="flex justify-between gap-3"><dt className="text-muted">Car</dt><dd className="font-semibold text-ink">{sel.name}</dd></div>
              <div className="flex items-baseline justify-between gap-3 border-t border-line pt-3"><dt className="font-semibold text-ink">Total</dt><dd className="text-2xl font-bold tabular-nums text-ink">{selFare}</dd></div>
            </dl>
          </aside>
        </div>
      )}

      {step === "done" && (
        <section aria-labelledby="h1c" className={`${panel} mx-auto flex max-w-[640px] flex-col items-start gap-5 p-[clamp(24px,4vw,40px)]`}>
          <span className="grid size-14 place-items-center rounded-full bg-[#E7F6F0]"><CircleCheck size={30} className="text-ok" /></span>
          <h1 id="h1c" className="text-[clamp(26px,3vw,36px)] font-bold leading-[1.15] tracking-[-0.02em] text-ink">One last step: send your booking</h1>
          <p className="text-[17px] leading-[1.6]">
            Thanks, {f.name.trim().split(" ")[0] || "there"}. Your booking reference is <strong className="tabular-nums text-ink">{ref}</strong>. Send it to us on WhatsApp and we will confirm your cab. Driver name, phone and car number reach you on +91 {f.phone} before pickup.
          </p>
          <dl className="grid w-full grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
            <div className="rounded-xl bg-page p-3.5"><dt className="text-[13px] text-muted">Route</dt><dd className="mt-1 font-semibold text-ink">{from} → {to}</dd></div>
            <div className="rounded-xl bg-page p-3.5"><dt className="text-[13px] text-muted">Pickup</dt><dd className="mt-1 font-semibold text-ink">{when}</dd></div>
            <div className="rounded-xl bg-page p-3.5"><dt className="text-[13px] text-muted">{sel.name}</dt><dd className="mt-1 font-bold tabular-nums text-ink">{selFare}</dd></div>
          </dl>
          <div className="flex flex-wrap gap-2.5">
            <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className="flex h-[52px] items-center gap-2 rounded-[10px] bg-brand px-5 font-bold text-ink transition-colors hover:bg-brand-dark">
              <MessageCircle size={18} />
              Send booking on WhatsApp
            </a>
            <a href={contact.tel} className="flex h-[52px] items-center rounded-[10px] bg-ink px-5 font-semibold tabular-nums text-white transition-colors hover:bg-graphite">Or call {contact.phone}</a>
            <Link href="/" className="flex h-[52px] items-center rounded-[10px] border-[1.5px] border-ink px-5 font-semibold text-ink transition-colors hover:bg-ink hover:text-white">Back to home</Link>
          </div>
        </section>
      )}
    </main>
  );
}
