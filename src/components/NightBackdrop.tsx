import type { CSSProperties, ReactNode } from "react";

type Variant = "hero" | "band" | "cta" | "mini";
type City = [label: string, x: number, y: number, end?: 1];

type Config = {
  par: string;
  hub: [number, number];
  hubPin: string | false;
  k: number;
  cities: City[];
  links: [number, number][];
  trails: boolean;
  bigPins?: boolean;
  glow: string;
  veil: string;
};

const CONFIG: Record<Variant, Config> = {
  hero: {
    par: "xMidYMax slice", hub: [720, 900], hubPin: false, k: 0.16,
    cities: [["Ahmedabad", 170, 95], ["Gandhinagar", 360, 60], ["Rajkot", 90, 470], ["Dwarka", 120, 700], ["Udaipur", 1130, 70], ["Indore", 1330, 135, 1], ["Statue of Unity", 1290, 470, 1], ["Surat", 1350, 620, 1], ["Mumbai", 1300, 780, 1]],
    links: [[0, 1], [0, 2], [2, 3], [4, 5], [6, 7], [7, 8]], trails: true,
    glow: "radial-gradient(55% 45% at 50% 100%, rgba(255,187,3,0.22), transparent 70%), radial-gradient(40% 45% at 8% 0%, rgba(110,110,110,0.40), transparent 70%), radial-gradient(35% 40% at 96% 18%, rgba(110,110,110,0.30), transparent 70%)",
    veil: "radial-gradient(42% 34% at 50% 34%, rgba(22,22,22,0.78), transparent 100%)",
  },
  band: {
    par: "xMaxYMid slice", hub: [1120, 430], hubPin: "Vadodara", k: 0.14,
    cities: [["Ahmedabad", 930, 300], ["Statue of Unity", 1330, 330, 1], ["Surat", 1310, 540, 1], ["Rajkot", 860, 500], ["Mumbai", 1180, 600]],
    links: [[0, 3]], trails: false,
    glow: "radial-gradient(40% 70% at 78% 50%, rgba(255,187,3,0.16), transparent 70%), radial-gradient(40% 80% at 0% 0%, rgba(110,110,110,0.35), transparent 70%)",
    veil: "linear-gradient(90deg, rgba(22,22,22,0.95) 0%, rgba(22,22,22,0.7) 45%, rgba(22,22,22,0) 75%)",
  },
  cta: {
    par: "xMidYMid slice", hub: [720, 410], hubPin: false, k: 0.12,
    cities: [["", 120, 220], ["", 260, 600], ["", 90, 420], ["", 1320, 200, 1], ["", 1180, 620, 1], ["", 1360, 430, 1]],
    links: [[0, 2], [3, 5]], trails: true,
    glow: "radial-gradient(40% 60% at 50% 50%, rgba(255,187,3,0.18), transparent 70%), radial-gradient(40% 60% at 0% 100%, rgba(110,110,110,0.35), transparent 70%), radial-gradient(40% 60% at 100% 0%, rgba(110,110,110,0.30), transparent 70%)",
    veil: "radial-gradient(38% 45% at 50% 50%, rgba(22,22,22,0.75), transparent 100%)",
  },
  mini: {
    par: "xMidYMid slice", hub: [260, 640], hubPin: false, k: 0.2,
    cities: [["", 1180, 220, 1]], links: [], trails: false, bigPins: true,
    glow: "radial-gradient(60% 60% at 100% 0%, rgba(255,187,3,0.22), transparent 70%), radial-gradient(60% 60% at 0% 100%, rgba(110,110,110,0.45), transparent 70%)",
    veil: "linear-gradient(0deg, rgba(22,22,22,0.85) 0%, rgba(22,22,22,0.2) 60%)",
  },
};

const curve = (a: number[], b: number[], k: number) => {
  const [x1, y1] = a, [x2, y2] = b;
  const cx = (x1 + x2) / 2 + (y2 - y1) * k, cy = (y1 + y2) / 2 - (x2 - x1) * k;
  return `M${x1} ${y1} Q${cx} ${cy} ${x2} ${y2}`;
};

/**
 * Decorative animated route map used behind dark sections.
 * `transparent` drops the solid base so it can sit over a photo.
 */
export default function NightBackdrop({
  variant = "hero",
  transparent = false,
  labels = true,
  className = "",
  style,
}: {
  variant?: Variant;
  transparent?: boolean;
  labels?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const v = variant, C = CONFIG[v];
  const glowId = `qcglow-${v}`;
  const els: ReactNode[] = [];

  C.links.forEach(([a, b], i) => {
    const d = curve(C.cities[a].slice(1, 3) as number[], C.cities[b].slice(1, 3) as number[], 0.1);
    els.push(<path key={`l${i}`} d={d} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth={1.2} strokeDasharray="2 9" strokeLinecap="round" />);
  });

  C.cities.forEach((c, i) => {
    const d = curve(C.hub, [c[1], c[2]], (i % 2 ? -1 : 1) * C.k);
    const dur = (4.5 + (i % 4) * 0.9).toFixed(1) + "s", delay = (-(i * 1.3)).toFixed(1) + "s";
    els.push(
      <path key={`b${i}`} d={d} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={1.2} />,
      <path key={`f${i}`} className="qc-anim" d={d} fill="none" stroke="rgba(255,187,3,0.38)" strokeWidth={1.8} strokeDasharray="1 10" strokeLinecap="round" style={{ animation: "qcFlow 6s linear infinite" }} />,
      <path key={`c${i}`} className="qc-anim qc-comet" d={d} fill="none" pathLength={1000} stroke="#FFD45C" strokeWidth={C.bigPins ? 4 : 2.6} strokeLinecap="round" strokeDasharray="70 930" filter={`url(#${glowId})`} style={{ animation: `qcComet ${dur} cubic-bezier(.45,.05,.55,.95) ${delay} infinite` }} />,
    );
  });

  const pin = (x: number, y: number, key: string, label: string, end?: 1 | boolean, big?: boolean) => {
    const r = big ? 7 : 4;
    return (
      <g key={key}>
        <circle className="qc-anim" cx={x} cy={y} r={r} fill="none" stroke="#FFBB03" strokeWidth={1.5} style={{ transformBox: "fill-box", transformOrigin: "center", animation: `qcPulse 2.8s ease-out ${-(key.length % 5) * 0.5}s infinite` }} />
        <circle cx={x} cy={y} r={r + 5} fill="rgba(255,187,3,0.18)" />
        <circle cx={x} cy={y} r={r} fill="#FFBB03" filter={`url(#${glowId})`} />
        {label && labels && (
          <text x={end ? x - 14 : x + 14} y={y + 5} textAnchor={end ? "end" : "start"} fill="rgba(255,255,255,0.62)" className={v === "band" ? "max-[699px]:hidden" : "max-[899px]:hidden"} style={{ font: "500 14px var(--font-poppins), sans-serif", letterSpacing: "0.02em" }}>
            {label}
          </text>
        )}
      </g>
    );
  };

  C.cities.forEach((c, i) => els.push(pin(c[1], c[2], `pin${i}${c[0]}`, c[0], c[3], C.bigPins)));
  if (C.bigPins) els.push(pin(C.hub[0], C.hub[1], "hubmini", "", false, true));
  if (C.hubPin) {
    els.push(
      <circle key="hubhalo" cx={C.hub[0]} cy={C.hub[1]} r={26} fill="rgba(255,187,3,0.12)" />,
      pin(C.hub[0], C.hub[1], "hub", "", false, true),
      labels && <text key="hubt" className="max-[699px]:hidden" x={C.hub[0] + 20} y={C.hub[1] - 16} fill="#FFFFFF" style={{ font: "700 15px var(--font-poppins), sans-serif" }}>{C.hubPin}</text>,
    );
  }
  if (C.trails) {
    [[690, 0, 9], [740, -3, 12], [780, -6, 10.5], [640, -8, 14]].forEach(([y, d, s], i) => {
      els.push(
        <g key={`tr${i}`} transform={`rotate(-7 720 ${y})`}>
          <rect className="qc-anim" x={120} y={y} width={1200} height={i % 2 ? 1.2 : 2} rx={1} fill={`url(#qct-${v})`} style={{ animation: `qcTrail ${s}s linear ${d}s infinite` }} />
        </g>,
      );
    });
  }

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] ${transparent ? "" : "bg-night"} ${className}`} style={style}>
      <div className="qc-anim absolute inset-0" style={{ background: C.glow, animation: "qcBreath 8s ease-in-out infinite" }} />
      <svg viewBox="0 0 1440 820" preserveAspectRatio={C.par} className="absolute inset-0 h-full w-full">
        <defs>
          <pattern id={`qcg-${v}`} width={48} height={48} patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth={1} />
          </pattern>
          <radialGradient id={`qcm-${v}`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#fff" stopOpacity={1} />
            <stop offset="100%" stopColor="#fff" stopOpacity={0} />
          </radialGradient>
          <mask id={`qcmask-${v}`}>
            <rect width={1440} height={820} fill={`url(#qcm-${v})`} />
          </mask>
          <linearGradient id={`qct-${v}`} x1={0} x2={1} y1={0} y2={0}>
            <stop offset="0" stopColor="#FFBB03" stopOpacity={0} />
            <stop offset="0.5" stopColor="#FFD45C" stopOpacity={0.9} />
            <stop offset="1" stopColor="#FFBB03" stopOpacity={0} />
          </linearGradient>
          <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={3} result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width={1440} height={820} fill={`url(#qcg-${v})`} mask={`url(#qcmask-${v})`} />
        {els}
      </svg>
      <div className="absolute inset-0" style={{ background: C.veil }} />
    </div>
  );
}
