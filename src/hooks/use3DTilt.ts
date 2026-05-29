import { useCallback, useRef } from "react";

// ─── 🔱 3D Tilt Hook ───────────────────────────────────────────────────────────
// Applies mouse-reactive perspective tilt to any card element

interface TiltOptions {
  maxTilt?: number;   // max degrees of rotation (default 12)
  scale?: number;     // scale on hover (default 1.02)
  speed?: number;     // transition speed in ms (default 400)
  glowColor?: string; // CSS color for box-shadow glow
}

export function use3DTilt(options: TiltOptions = {}) {
  const {
    maxTilt = 12,
    scale = 1.02,
    speed = 400,
    glowColor = "rgba(255, 107, 26, 0.2)",
  } = options;

  const cardRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !isHovering.current) return;
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation (inverted for natural feel)
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;
      card.style.boxShadow = `0 25px 60px rgba(0,0,0,0.4), 0 0 40px ${glowColor}`;

      // Move shine layer if present
      const shine = card.querySelector(".tilt-shine") as HTMLElement | null;
      if (shine) {
        shine.style.opacity = "1";
        shine.style.background = `
          radial-gradient(
            circle at ${x}px ${y}px,
            rgba(255, 255, 255, 0.12) 0%,
            transparent 60%
          )
        `;
      }
    },
    [maxTilt, scale, glowColor]
  );

  const handleMouseEnter = useCallback(() => {
    isHovering.current = true;
    if (cardRef.current) {
      cardRef.current.style.transition = `transform ${speed}ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow ${speed}ms ease`;
    }
  }, [speed]);

  const handleMouseLeave = useCallback(() => {
    isHovering.current = false;
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      cardRef.current.style.boxShadow = "none";
      cardRef.current.style.transition = `transform ${speed}ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow ${speed}ms ease`;

      const shine = cardRef.current.querySelector(".tilt-shine") as HTMLElement | null;
      if (shine) {
        shine.style.opacity = "0";
      }
    }
  }, [speed]);

  return {
    cardRef,
    tiltHandlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
