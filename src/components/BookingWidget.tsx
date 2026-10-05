"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent, type KeyboardEvent } from "react";
import { CircleCheck, LoaderCircle, MapPin, Navigation, type LucideIcon } from "lucide-react";
import { cities, contact, findRoute, inr, rentalPackages, ROUND_TRIP_MULT } from "@/lib/site-data";

type Tab = "oneway" | "round" | "rental";
type FieldKey = "from" | "to";
type Item = { label: string; sub: string; city: string | null };
type Errs = Partial<Record<"from" | "to" | "same" | "date" | "ret", string>>;

const TABS: [Tab, string][] = [["oneway", "One Way"], ["round", "Round Trip"], ["rental", "Rental"]];

const localISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function suggestions(q: string, other: string): Item[] {
  const mk = (c: string, sub: string): Item => ({ label: c, sub, city: c });
  const term = q.trim().toLowerCase();
  let list = term
    ? cities.filter((c) => c.toLowerCase().includes(term)).slice(0, 7).map((c) => mk(c, ""))
    : [mk("Vadodara", "Recent"), ...cities.slice(1, 7).map((c) => mk(c, "Popular"))];
  list = list.filter((i) => i.city !== other);
  if (!list.length) list = [{ label: `No match. Call ${contact.phone} for other cities`, sub: "", city: null }];
  return list;
}

const labelCls = "text-sm font-semibold text-ink";
const errCls = "m-0 text-sm text-danger";

function CityField(p: {
  id: string;
  label: string;
  Icon: LucideIcon;
  q: string;
  open: boolean;
  items: Item[];
  active: number;
  err?: string;
  onChange: (v: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onPick: (city: string | null) => void;
  onHover: (i: number) => void;
}) {
  const listId = `${p.id}-list`;
  return (
    <div className="relative flex min-w-0 flex-col gap-1.5">
      <label htmlFor={p.id} className={labelCls}>{p.label}</label>
      <div className="relative">
        <p.Icon size={20} className="pointer-events-none absolute left-3.5 top-4 text-muted" />
        <input
          id={p.id}
          type="text"
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={p.open}
          aria-controls={listId}
          aria-activedescendant={p.open ? `${p.id}-opt-${p.active}` : undefined}
          aria-invalid={!!p.err}
          aria-describedby={p.err ? `${p.id}-err` : undefined}
          placeholder="Type a city"
          value={p.q}
          onChange={(e) => p.onChange(e.target.value)}
          onFocus={p.onFocus}
          onBlur={p.onBlur}
          onKeyDown={p.onKeyDown}
          className="qc-input pl-11"
        />
      </div>
      {p.open && (
        <div id={listId} role="listbox" aria-label={`${p.label} suggestions`} className="absolute inset-x-0 top-[84px] z-30 max-h-[280px] overflow-auto rounded-xl border border-line bg-white p-1.5 shadow-[0_16px_40px_rgba(20,20,20,0.14)]">
          {p.items.map((it, i) => (
            <button
              key={it.label}
              id={`${p.id}-opt-${i}`}
              type="button"
              role="option"
              aria-selected={i === p.active}
              tabIndex={-1}
              onMouseDown={(e) => { e.preventDefault(); p.onPick(it.city); }}
              onMouseEnter={() => p.onHover(i)}
              className={`flex min-h-12 w-full items-center gap-2.5 rounded-lg px-3 text-left text-[15px] font-medium text-ink ${i === p.active && it.city ? "bg-chip" : ""}`}
            >
              <span className="flex-1">{it.label}</span>
              <span className="text-xs text-muted">{it.sub}</span>
            </button>
          ))}
        </div>
      )}
      {p.err && <p id={`${p.id}-err`} role="alert" className={errCls}>{p.err}</p>}
    </div>
  );
}

export default function BookingWidget({
  uid = "bw",
  layout = "card",
  from: initFrom = "",
  to: initTo = "",
  tab: initTab = "oneway",
  cta = "Check Fare",
}: {
  uid?: string;
  layout?: "card" | "bar";
  from?: string;
  to?: string;
  tab?: Tab;
  cta?: string;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>(initTab);
  const [city, setCity] = useState({ from: initFrom, to: initTo });
  const [query, setQuery] = useState({ from: initFrom, to: initTo });
  const [open, setOpen] = useState<FieldKey | null>(null);
  const [active, setActive] = useState(0);
  const [today, setToday] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [ret, setRet] = useState("");
  const [pkg, setPkg] = useState("8");
  const [errs, setErrs] = useState<Errs>({});
  const [loading, setLoading] = useState(false);

  // Dates depend on the visitor's clock, so they are filled in after hydration.
  useEffect(() => {
    const now = new Date();
    setToday(localISO(now));
    setDate(localISO(new Date(now.getTime() + 864e5)));
  }, []);

  const rental = tab === "rental", round = tab === "round";
  const card = layout === "card";

  const pick = (f: FieldKey, c: string | null) => {
    if (!c) return;
    setCity((s) => ({ ...s, [f]: c }));
    setQuery((s) => ({ ...s, [f]: c }));
    setOpen(null);
    setErrs((e) => ({ ...e, [f]: undefined, same: undefined }));
  };

  const field = (f: FieldKey) => {
    const items = suggestions(query[f], f === "from" ? city.to : city.from);
    return {
      q: query[f],
      open: open === f,
      items,
      active: Math.min(active, items.length - 1),
      err: errs[f] || (f === "to" ? errs.same : undefined),
      onChange: (v: string) => {
        const match = cities.find((c) => c.toLowerCase() === v.trim().toLowerCase());
        setQuery((s) => ({ ...s, [f]: v }));
        setCity((s) => ({ ...s, [f]: match || "" }));
        setOpen(f);
        setActive(0);
      },
      onFocus: () => { setOpen(f); setActive(0); },
      onBlur: () => setTimeout(() => setOpen((o) => (o === f ? null : o)), 120),
      onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") setOpen(null);
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          if (open !== f) return setOpen(f);
          setActive((a) => (Math.min(a, items.length - 1) + (e.key === "ArrowDown" ? 1 : items.length - 1)) % items.length);
        }
        if (e.key === "Enter" && open === f) {
          e.preventDefault();
          pick(f, items[Math.min(active, items.length - 1)]?.city ?? null);
        }
      },
      onPick: (c: string | null) => pick(f, c),
      onHover: setActive,
    };
  };

  let preview: { from: string; to: string; meta: string; fare: string; unit: string; note: string } | null = null;
  if (rental && city.from) {
    const base = rentalPackages.find((p) => String(p.hours) === pkg)!.base;
    preview = { from: city.from, to: `Local, ${pkg} hr`, meta: "Hatchback", fare: inr(base), unit: "from", note: "Extra km and hours charged at a fixed rate" };
  } else if (!rental && city.from && city.to && city.from !== city.to) {
    const r = findRoute(city.from, city.to);
    const note = round ? "Driver stays with you until the return" : "Pay for one way only. No return fare.";
    preview = r
      ? { from: city.from, to: city.to, meta: `${r.km} km · about ${r.time} · Sedan`, fare: round ? inr(r.sedan * ROUND_TRIP_MULT) : r.from, unit: round ? "round trip" : "one way", note }
      : { from: city.from, to: city.to, meta: "Fare for this route", fare: "On the next step", unit: "", note };
  }

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: Errs = {};
    if (!city.from) next.from = query.from ? "Choose a city from the list" : "Enter a pickup city";
    if (!rental && !city.to) next.to = query.to ? "Choose a city from the list" : "Enter a drop city";
    if (!rental && city.from && city.from === city.to) next.same = "Pickup and drop city can’t be the same";
    if (!date) next.date = "Pick a travel date";
    else if (today && date < today) next.date = "Pick today or a later date";
    if (round && !ret) next.ret = "Pick a return date";
    else if (round && date && ret < date) next.ret = "Return can’t be before the travel date";
    setErrs(next);
    setOpen(null);
    if (Object.keys(next).length) return;
    setLoading(true);
    const q = new URLSearchParams({ trip: tab, from: city.from, to: rental ? `Local ${pkg} hr` : city.to, date, time });
    if (round) q.set("ret", ret);
    router.push(`/booking?${q}`);
  };

  const id = (s: string) => `${uid}-${s}`;

  return (
    <form id={uid} onSubmit={submit} noValidate aria-label="Check cab fare" className="flex flex-col gap-[18px] rounded-2xl border border-line bg-white p-5 text-left text-body shadow-[0_12px_40px_rgba(20,20,20,0.08),0_2px_6px_rgba(20,20,20,0.04)]">
      <div role="tablist" aria-label="Trip type" className="no-scrollbar flex max-w-full gap-1 self-start overflow-x-auto rounded-xl bg-chip p-1">
        {TABS.map(([t, label]) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => { setTab(t); setErrs({}); }}
            className={`h-10 whitespace-nowrap rounded-[10px] px-[18px] text-sm font-semibold leading-none transition-colors ${tab === t ? "bg-white text-ink shadow-[0_1px_3px_rgba(20,20,20,0.12)]" : "text-muted hover:text-ink"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid items-start gap-x-3 gap-y-3.5" style={{ gridTemplateColumns: `repeat(auto-fit,minmax(${card ? "100%" : "210px"},1fr))` }}>
        <CityField id={id("from")} label="Pickup city" Icon={MapPin} {...field("from")} />

        {rental ? (
          <div className="flex min-w-0 flex-col gap-1.5">
            <label htmlFor={id("pkg")} className={labelCls}>Package</label>
            <select id={id("pkg")} value={pkg} onChange={(e) => setPkg(e.target.value)} className="qc-input">
              {rentalPackages.map((p) => (
                <option key={p.hours} value={p.hours}>{p.hours} hr / {p.km} km</option>
              ))}
            </select>
          </div>
        ) : (
          <CityField id={id("to")} label="Drop city" Icon={Navigation} {...field("to")} />
        )}

        <div className="grid min-w-0 grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-x-3 gap-y-1.5">
          <div className="flex min-w-0 flex-col gap-1.5">
            <label htmlFor={id("date")} className={labelCls}>Date</label>
            <input
              id={id("date")}
              type="date"
              min={today}
              value={date}
              onChange={(e) => { setDate(e.target.value); setErrs((s) => ({ ...s, date: undefined })); }}
              aria-invalid={!!errs.date}
              className="qc-input px-3 tabular-nums"
            />
          </div>
          <div className="flex min-w-0 flex-col gap-1.5">
            <label htmlFor={id("time")} className={labelCls}>Time</label>
            <input id={id("time")} type="time" value={time} onChange={(e) => setTime(e.target.value)} className="qc-input px-3 tabular-nums" />
          </div>
          {errs.date && <p role="alert" className={`${errCls} col-span-full`}>{errs.date}</p>}
        </div>

        {round && (
          <div className="flex min-w-0 flex-col gap-1.5">
            <label htmlFor={id("ret")} className={labelCls}>Return date</label>
            <input
              id={id("ret")}
              type="date"
              min={date || today}
              value={ret}
              onChange={(e) => { setRet(e.target.value); setErrs((s) => ({ ...s, ret: undefined })); }}
              aria-invalid={!!errs.ret}
              className="qc-input px-3 tabular-nums"
            />
            {errs.ret && <p role="alert" className={errCls}>{errs.ret}</p>}
          </div>
        )}

        <div className="flex min-w-0 flex-col gap-1.5">
          {/* Empty label row so the button lines up with the inputs in the bar layout. */}
          {!card && <span aria-hidden="true" className="invisible hidden text-sm leading-[21px] min-[520px]:block">&#8203;</span>}
          <button type="submit" disabled={loading} className="flex h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-brand text-base font-bold leading-none text-ink shadow-[0_6px_16px_rgba(229,165,0,0.28)] transition-colors hover:bg-brand-dark disabled:opacity-80">
            {loading && <LoaderCircle size={18} className="animate-[qcSpin_0.9s_linear_infinite]" />}
            {loading ? "Checking fares…" : cta}
          </button>
        </div>
      </div>

      {preview && (
        <div aria-live="polite" className="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-xl border border-line bg-page p-4">
          <div className="flex min-w-0 flex-[1_1_240px] items-center gap-2.5">
            <span className="size-2.5 flex-none rounded-full bg-ink" />
            <span className="truncate font-semibold text-ink">{preview.from}</span>
            <span className="min-w-6 flex-1 border-t-2 border-dashed border-[#C4C4C4]" />
            <span className="size-2.5 flex-none rounded-full bg-brand shadow-[0_0_0_2px_#1E1E1E]" />
            <span className="truncate font-semibold text-ink">{preview.to}</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] text-muted">{preview.meta}</span>
            <span className="text-[22px] font-bold leading-[1.2] tabular-nums text-ink">
              {preview.fare} <span className="text-[13px] font-medium text-muted">{preview.unit}</span>
            </span>
          </div>
          <span className="flex basis-full items-center gap-1.5 text-sm font-semibold text-ok-text">
            <CircleCheck size={16} className="text-ok" />
            {preview.note}
          </span>
        </div>
      )}
    </form>
  );
}
