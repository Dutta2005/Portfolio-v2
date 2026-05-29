import { useRef, useEffect, useState, useCallback } from "react";
import { achievements } from "../../data/portfolio";

const COLOR_MAP = {
  gold: { primary: "#f59e0b", glow: "rgba(245,158,11,0.3)", border: "rgba(245,158,11,0.3)", bg: "rgba(245,158,11,0.06)" },
  saffron: { primary: "#ff6b1a", glow: "rgba(255,107,26,0.3)", border: "rgba(255,107,26,0.3)", bg: "rgba(255,107,26,0.06)" },
  violet: { primary: "#8b5cf6", glow: "rgba(139,92,246,0.3)", border: "rgba(139,92,246,0.3)", bg: "rgba(139,92,246,0.06)" },
  ganga: { primary: "#22d3ee", glow: "rgba(34,211,238,0.25)", border: "rgba(34,211,238,0.25)", bg: "rgba(34,211,238,0.04)" },
};

function AchievementCard3D({
  achievement,
  index,
  visible,
}: {
  achievement: (typeof achievements)[0];
  index: number;
  visible: boolean;
}) {
  const c = COLOR_MAP[achievement.color];
  const delay = index * 150;
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    cardRef.current.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateZ(15px) scale(1.03)`;

    // Spotlight shine
    const shine = cardRef.current.querySelector(".tilt-shine") as HTMLElement | null;
    if (shine) {
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      shine.style.opacity = "1";
      shine.style.background = `radial-gradient(circle at ${px}px ${py}px, rgba(255,255,255,0.1) 0%, transparent 60%)`;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(600px) rotateX(0) rotateY(0) translateZ(0) scale(1)";
      const shine = cardRef.current.querySelector(".tilt-shine") as HTMLElement | null;
      if (shine) shine.style.opacity = "0";
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative p-7 rounded-2xl text-center cursor-default ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        animation: visible ? `flip-in-x 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms both` : "none",
        background: c.bg,
        border: `1px solid ${isHovered ? c.primary + "60" : c.border}`,
        backdropFilter: "blur(20px)",
        transformStyle: "preserve-3d",
        boxShadow: isHovered ? `0 25px 60px rgba(0,0,0,0.4), 0 0 40px ${c.glow}` : "none",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Shine overlay */}
      <div className="tilt-shine absolute inset-0 rounded-2xl pointer-events-none z-10" style={{ opacity: 0, transition: "opacity 0.3s ease" }} />

      {/* Shimmer top line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-0.5 rounded-full"
        style={{
          background: c.primary,
          boxShadow: isHovered ? `0 0 12px ${c.primary}` : "none",
        }}
      />

      {/* Sacred flame beneath icon */}
      <div
        className="relative inline-block mb-4"
        style={{ transform: "translateZ(20px)" }}
      >
        {/* Fire glow behind icon */}
        <div
          className="absolute inset-0 -m-3 rounded-full transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, ${c.primary}30 0%, transparent 70%)`,
            opacity: isHovered ? 1 : 0,
            animation: isHovered ? "breathing-glow 2s ease-in-out infinite" : "none",
          }}
        />
        <div
          className="text-5xl block relative"
          style={{
            filter: `drop-shadow(0 0 ${isHovered ? "20px" : "12px"} ${c.primary}80)`,
            animation: `glow-pulse 3s ease-in-out infinite`,
            animationDelay: `${index * 0.5}s`,
            transition: "filter 0.3s ease",
          }}
        >
          {achievement.icon}
        </div>
      </div>

      {/* Title */}
      <h3
        className="font-cinzel font-bold text-base mb-3 leading-tight relative"
        style={{
          color: c.primary,
          transform: "translateZ(15px)",
        }}
      >
        {achievement.title}
      </h3>

      {/* Description */}
      <p
        className="mb-4 leading-relaxed relative"
        style={{
          color: "rgba(232,224,240,0.6)",
          fontSize: "13px",
          lineHeight: "1.8",
          transform: "translateZ(10px)",
        }}
      >
        {achievement.description}
      </p>

      {/* Date badge */}
      <div
        className="inline-flex items-center px-3 py-1 rounded-full relative"
        style={{
          background: `${c.primary}12`,
          border: `1px solid ${c.primary}30`,
          transform: "translateZ(12px)",
        }}
      >
        <span className="font-cinzel text-xs" style={{ color: c.primary, letterSpacing: "2px" }}>
          {achievement.date}
        </span>
      </div>
    </div>
  );
}

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

        {/* Achievement cards — 3D */}
        <div className="grid md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <AchievementCard3D
              key={index}
              achievement={achievement}
              index={index}
              visible={visible}
            />
          ))}
        </div>

        {/* Open Source callout — 3D elevated */}
        <div
          className={`mt-12 relative transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Layered shadow platform */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background: "rgba(14,14,26,0.5)",
              transform: "translateY(8px) scale(0.97)",
              filter: "blur(4px)",
            }}
          />
          <div
            className="relative p-8 rounded-2xl text-center neon-border"
            style={{ backdropFilter: "blur(20px)" }}
          >
            <div className="text-4xl mb-4" style={{ filter: "drop-shadow(0 0 15px rgba(245,158,11,0.6))" }}>🔱</div>
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
      </div>
    </section>
  );
}
