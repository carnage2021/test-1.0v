import { CircleCheck, Phone } from "lucide-react";

// Illustrative app screens. Everything inside is sized in em so the
// mock-up scales with the phone frame (see .qc-phone-screen).

export function BookingScreen() {
  return (
    <div className="qc-phone-screen flex h-full flex-col gap-[0.8em] p-[1.1em] text-left text-white">
      <div className="flex items-center justify-between text-[0.8em] text-white/70">
        <span className="font-semibold">The Quick Cab</span>
        <span className="flex items-center gap-[0.4em]"><span className="size-[0.55em] rounded-full bg-mint" />24x7</span>
      </div>
      <strong className="text-[1.5em] leading-[1.15]">Where to?</strong>
      <div className="flex flex-col gap-[0.7em] rounded-[1em] border border-white/15 bg-white/10 p-[0.9em]">
        <span className="flex items-center gap-[0.6em]"><span className="size-[0.6em] rounded-full border-[0.15em] border-white" />Vadodara</span>
        <span className="h-px bg-white/15" />
        <span className="flex items-center gap-[0.6em]"><span className="size-[0.6em] rounded-full bg-brand" />Surat</span>
      </div>
      <div className="grid grid-cols-2 gap-[0.5em] text-[0.85em]">
        <span className="rounded-[0.8em] bg-white/10 px-[0.8em] py-[0.6em]">Tomorrow</span>
        <span className="rounded-[0.8em] bg-white/10 px-[0.8em] py-[0.6em] tabular-nums">9:00 am</span>
      </div>
      <div className="flex items-center justify-between rounded-[1em] bg-white p-[0.9em] text-ink">
        <span className="flex flex-col leading-[1.3]">
          <strong>Sedan</strong>
          <span className="text-[0.75em] text-muted">155 km · 3 hr</span>
        </span>
        <strong className="text-[1.25em] tabular-nums">₹2,599</strong>
      </div>
      <span className="flex items-center gap-[0.4em] text-[0.75em] text-mint"><CircleCheck className="size-[1.2em]" />No return fare</span>
      <span className="mt-auto grid h-[3em] place-items-center rounded-full bg-brand font-bold text-ink">Check fare</span>
    </div>
  );
}

export function TripScreen() {
  return (
    <div className="qc-phone-screen flex h-full flex-col gap-[0.8em] p-[1.1em] text-left text-body">
      <div className="flex items-center justify-between">
        <strong className="text-[1.15em] text-ink">Your trip</strong>
        <span className="rounded-full bg-[#E7F6F0] px-[0.7em] py-[0.3em] text-[0.7em] font-semibold text-ok-text">Driver assigned</span>
      </div>
      <div className="relative h-[34%] overflow-hidden rounded-[1em] bg-[#EFEFEC]">
        <svg viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
          <path d="M0 40H160M0 86H160M45 0V120M112 0V120" stroke="#FFFFFF" strokeWidth="8" />
          <path d="M22 96 L45 96 L45 40 L112 40 L112 22 L136 22" fill="none" stroke="#1E1E1E" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" />
          <path d="M22 96 L45 96 L45 40 L112 40 L112 22 L136 22" fill="none" stroke="#FFBB03" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
          <circle cx="22" cy="96" r="6" fill="#1E1E1E" />
          <circle cx="22" cy="96" r="2.5" fill="#FFFFFF" />
          <circle cx="136" cy="22" r="7" fill="#FFBB03" stroke="#1E1E1E" strokeWidth="2.5" />
        </svg>
      </div>
      <div className="flex flex-col gap-[0.2em] rounded-[1em] bg-white p-[0.9em] shadow-[0_0.3em_1em_rgba(20,20,20,0.06)]">
        <strong className="text-ink">Vadodara → Ahmedabad</strong>
        <span className="text-[0.8em] text-muted">Sedan · 112 km · about 2 hr</span>
      </div>
      <div className="flex items-center gap-[0.7em] rounded-[1em] bg-white p-[0.9em] shadow-[0_0.3em_1em_rgba(20,20,20,0.06)]">
        <span className="grid size-[2.4em] flex-none place-items-center rounded-full bg-ink font-bold text-brand">D</span>
        <span className="flex min-w-0 flex-col leading-[1.3]">
          <strong className="text-ink">Driver details</strong>
          <span className="truncate text-[0.75em] text-muted">Name, phone, car number</span>
        </span>
      </div>
      <div className="mt-auto flex items-center justify-between gap-[0.6em]">
        <span className="flex flex-col leading-[1.2]">
          <span className="text-[0.7em] text-muted">Total</span>
          <strong className="text-[1.3em] tabular-nums text-ink">₹1,999</strong>
        </span>
        <span className="flex h-[2.8em] items-center gap-[0.4em] rounded-full bg-ink px-[1.1em] text-[0.85em] font-semibold text-white"><Phone className="size-[1.1em]" />Call</span>
      </div>
    </div>
  );
}
