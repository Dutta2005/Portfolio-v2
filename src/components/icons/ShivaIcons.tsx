// Sacred SVG icons for the Shiva-themed portfolio

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
