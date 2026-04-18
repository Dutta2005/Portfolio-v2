import { useRef, useEffect, useState } from "react";
import { achievements } from "../../data/portfolio";

const COLOR_MAP = {
  gold: { primary: "#f59e0b", glow: "rgba(245,158,11,0.3)", border: "rgba(245,158,11,0.3)", bg: "rgba(245,158,11,0.06)" },
  saffron: { primary: "#ff6b1a", glow: "rgba(255,107,26,0.3)", border: "rgba(255,107,26,0.3)", bg: "rgba(255,107,26,0.06)" },
  violet: { primary: "#8b5cf6", glow: "rgba(139,92,246,0.3)", border: "rgba(139,92,246,0.3)", bg: "rgba(139,92,246,0.06)" },
  ganga: { primary: "#22d3ee", glow: "rgba(34,211,238,0.25)", border: "rgba(34,211,238,0.25)", bg: "rgba(34,211,238,0.04)" },
};

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="achievements" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-radial-gold pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="font-cinzel text-xs mb-3 tracking-widest" style={{ color: "#f59e0b", letterSpacing: "5px" }}>
            🔱 DIVINE VICTORIES
          </p>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-4">
            <span style={{ color: "#e8e0f0" }}>Sacred </span>
            <span className="shimmer-gold">Achievements</span>
          </h2>
          <p className="max-w-lg mx-auto" style={{ color: "rgba(232,224,240,0.5)", fontSize: "14px" }}>
            Victories blessed by the grace of Lord Mahadev — each triumph a sacred offering
          </p>
          <div className="divine-separator max-w-xs mx-auto mt-4" />
        </div>

        {/* Achievement cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const c = COLOR_MAP[achievement.color];
            const delay = index * 150;

            return (
              <div
                key={index}
                className={`group relative p-7 rounded-2xl text-center transition-all duration-500 cursor-default ${
                  visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95"
                }`}
                style={{
                  transitionDelay: `${delay}ms`,
                  background: c.bg,
                  border: `1px solid ${c.border}`,
                  backdropFilter: "blur(20px)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.boxShadow = `0 0 40px ${c.glow}, 0 20px 60px rgba(0,0,0,0.3)`;
                  el.style.transform = "translateY(-6px) scale(1.02)";
                  el.style.borderColor = c.primary + "60";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0) scale(1)";
                  el.style.borderColor = c.border;
                }}
              >
                {/* Shimmer top line */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5 rounded-full"
                  style={{ background: c.primary }}
                />

                {/* Icon */}
                <div
                  className="text-5xl mb-4 block"
                  style={{
                    filter: `drop-shadow(0 0 12px ${c.primary}80)`,
                    animation: `glow-pulse 3s ease-in-out infinite`,
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  {achievement.icon}
                </div>

                {/* Title */}
                <h3
                  className="font-cinzel font-bold text-base mb-3 leading-tight"
                  style={{ color: c.primary }}
                >
                  {achievement.title}
                </h3>

                {/* Description */}
                <p
                  className="mb-4 leading-relaxed"
                  style={{ color: "rgba(232,224,240,0.6)", fontSize: "13px", lineHeight: "1.8" }}
                >
                  {achievement.description}
                </p>

                {/* Date badge */}
                <div
                  className="inline-flex items-center px-3 py-1 rounded-full"
                  style={{ background: `${c.primary}12`, border: `1px solid ${c.primary}30` }}
                >
                  <span className="font-cinzel text-xs" style={{ color: c.primary, letterSpacing: "2px" }}>
                    {achievement.date}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Open Source callout */}
        <div
          className={`mt-12 p-8 rounded-2xl text-center neon-border transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ backdropFilter: "blur(20px)" }}
        >
          <div className="text-4xl mb-4">🔱</div>
          <h3 className="font-cinzel text-xl font-bold mb-3 shimmer-gold">
            Open Source Devotion
          </h3>
          <p
            className="max-w-lg mx-auto leading-relaxed"
            style={{ color: "rgba(232,224,240,0.6)", fontSize: "14px" }}
          >
            Like Mahadev who gives unconditionally to the cosmos, I contribute to open source —
            building tools, guiding contributors, and spreading knowledge across the developer
            community through mentorship and infrastructure.
          </p>
          <div className="mt-4 flex justify-center gap-4 flex-wrap">
            {["JWoC 2026 Mentor", "DashSummarize", "Orbit CLI"].map((tag) => (
              <span
                key={tag}
                className="tech-pill"
                style={{
                  background: "rgba(245,158,11,0.1)",
                  border: "1px solid rgba(245,158,11,0.3)",
                  color: "#f59e0b",
                  fontSize: "12px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
