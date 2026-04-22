// Sacred SVG icons for the Shiva-themed portfolio

export function BigTrishulBg({ size = 800, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 270"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ════════════════════════════════
          THREE PRONGS — Trishul top
          ════════════════════════════════ */}

      {/* Center prong — tall sacred flame */}
      <path d="M50,73
        C47,62 41,48 43,28
        C44.5,14 47,6 50,2
        C53,6 55.5,14 57,28
        C59,48 53,62 50,73Z" />

      {/* Left prong — sweeps wide then curls up */}
      <path d="
        M46,73
        C38,71 22,65 10,50
        C2,37 5,20 13,11
        C15,19 12,33 18,45
        C24,57 40,69 46,73Z" />

      {/* Left prong pointed tip */}
      <path d="
        M13,11
        C10,4 13,0 16,3
        C15,7 14,10 13,11Z" />

      {/* Right prong — mirror of left */}
      <path d="
        M54,73
        C62,71 78,65 90,50
        C98,37 95,20 87,11
        C85,19 88,33 82,45
        C76,57 60,69 54,73Z" />

      {/* Right prong pointed tip */}
      <path d="
        M87,11
        C90,4 87,0 84,3
        C85,7 86,10 87,11Z" />

      {/* ── Prong base connector bar ── */}
      <rect x="36" y="73" width="28" height="4.5" rx="2" />
      <circle cx="36" cy="75.5" r="4" />
      <circle cx="64" cy="75.5" r="4" />

      {/* ════════════════════════════════
          DAMRU — Shiva's sacred drum
          ════════════════════════════════ */}

      {/* Upper drum body — trapezoid (wider at top) */}
      <path d="M18,82 L82,82 L63,110 L37,110 Z" />

      {/* Horizontal ribs on upper drum */}
      <line x1="20" y1="87"  x2="80" y2="87"  stroke="currentColor" strokeWidth="1.8" fill="none" />
      <line x1="23" y1="92"  x2="77" y2="92"  stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="27" y1="97"  x2="73" y2="97"  stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="31" y1="102" x2="69" y2="102" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="35" y1="107" x2="65" y2="107" stroke="currentColor" strokeWidth="1.5" fill="none" />

      {/* Damru waist — narrow connector with cross-cords */}
      <rect x="37" y="110" width="26" height="3" rx="1.5" />
      {/* Crossing cords at waist */}
      <line x1="37" y1="110" x2="63" y2="113" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <line x1="63" y1="110" x2="37" y2="113" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <rect x="37" y="113" width="26" height="3" rx="1.5" />

      {/* Lower drum body — trapezoid (wider at bottom, mirror) */}
      <path d="M37,116 L63,116 L82,144 L18,144 Z" />

      {/* Horizontal ribs on lower drum */}
      <line x1="35" y1="121" x2="65" y2="121" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="31" y1="126" x2="69" y2="126" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="27" y1="131" x2="73" y2="131" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="23" y1="136" x2="77" y2="136" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line x1="20" y1="141" x2="80" y2="141" stroke="currentColor" strokeWidth="1.8" fill="none" />

      {/* ════════════════════════════════
          SHAFT — long handle below damru
          ════════════════════════════════ */}

      {/* Main shaft */}
      <rect x="47" y="144" width="6" height="92" rx="3" />

      {/* Shaft ring decorations */}
      <ellipse cx="50" cy="158" rx="10" ry="3.5" />
      <ellipse cx="50" cy="178" rx="8"  ry="3" />
      <ellipse cx="50" cy="198" rx="6"  ry="2.5" />
      <ellipse cx="50" cy="216" rx="5"  ry="2" />

      {/* Base knob */}
      <ellipse cx="50" cy="235" rx="14" ry="5" />
      <rect x="45" y="227" width="10" height="10" rx="5" />
    </svg>
  );
}

export function OmIcon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="currentColor"
    >
      <text
        x="50"
        y="72"
        fontFamily="serif"
        fontSize="72"
        textAnchor="middle"
        fill="currentColor"
      >
        ॐ
      </text>
    </svg>
  );
}

export function TrishulIcon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 80" className={className} fill="currentColor">
      {/* Center prong */}
      <rect x="28" y="20" width="4" height="55" rx="2" />
      {/* Left prong */}
      <path d="M30 20 Q18 12 12 5 Q11 15 20 20 Q25 22 30 20Z" />
      {/* Right prong */}
      <path d="M30 20 Q42 12 48 5 Q49 15 40 20 Q35 22 30 20Z" />
      {/* Cross bar */}
      <rect x="14" y="28" width="32" height="3" rx="1.5" />
      {/* Middle prong */}
      <path d="M30 20 Q30 10 30 4" strokeWidth="3" stroke="currentColor" fill="none" />
      {/* Handle ornament */}
      <ellipse cx="30" cy="75" rx="8" ry="4" />
      <rect x="27" y="65" width="6" height="10" rx="3" />
    </svg>
  );
}

export function DamruIcon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" className={className} fill="currentColor">
      <ellipse cx="15" cy="30" rx="12" ry="18" />
      <ellipse cx="45" cy="30" rx="12" ry="18" />
      <path d="M27 30 L33 30" strokeWidth="3" stroke="currentColor" fill="none" />
      <line x1="30" y1="14" x2="12" y2="46" strokeWidth="2" stroke="currentColor" />
      <circle cx="10" cy="48" r="3" />
      <circle cx="50" cy="12" r="3" />
    </svg>
  );
}

export function SnakeIcon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" className={className} fill="none">
      <path
        d="M10 50 Q20 40 30 50 Q40 60 50 50 Q60 40 50 30 Q40 20 30 30 Q20 40 30 50"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="52" cy="28" r="3" fill="currentColor" />
      <line x1="53" y1="23" x2="56" y2="20" stroke="currentColor" strokeWidth="1.5" />
      <line x1="55" y1="25" x2="59" y2="23" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function MandalaRingIcon({
  size = 200,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const petals = 12;
  const r = 80;
  const innerR = 30;

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" className={className}>
      {/* Outer ring */}
      <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3" />
      <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.4" />
      <circle cx="100" cy="100" r="55" stroke="currentColor" strokeWidth="0.6" fill="none" opacity="0.3" />
      <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.6" />

      {/* Petals */}
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (i * 360) / petals;
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + innerR * Math.cos(rad);
        const y1 = 100 + innerR * Math.sin(rad);
        const x2 = 100 + r * Math.cos(rad);
        const y2 = 100 + r * Math.sin(rad);
        const cpAngle = rad + Math.PI / petals;
        const cp1x = 100 + 60 * Math.cos(cpAngle);
        const cp1y = 100 + 60 * Math.sin(cpAngle);
        return (
          <path
            key={i}
            d={`M ${x1} ${y1} Q ${cp1x} ${cp1y} ${x2} ${y2}`}
            stroke="currentColor"
            strokeWidth="0.7"
            fill="none"
            opacity="0.5"
          />
        );
      })}

      {/* Dot ornaments at petal tips */}
      {Array.from({ length: petals }).map((_, i) => {
        const angle = (i * 360) / petals;
        const rad = (angle * Math.PI) / 180;
        const x = 100 + 80 * Math.cos(rad);
        const y = 100 + 80 * Math.sin(rad);
        return <circle key={i} cx={x} cy={y} r="2" fill="currentColor" opacity="0.7" />;
      })}

      {/* Inner star */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const x = 100 + 26 * Math.cos(angle);
        const y = 100 + 26 * Math.sin(angle);
        return (
          <line
            key={i}
            x1="100"
            y1="100"
            x2={x}
            y2={y}
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.8"
          />
        );
      })}

      {/* Center Om */}
      <text
        x="100"
        y="107"
        fontFamily="serif"
        fontSize="20"
        textAnchor="middle"
        fill="currentColor"
        opacity="0.9"
      >
        ॐ
      </text>
    </svg>
  );
}
