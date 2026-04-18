import { useRef, useEffect, useState } from "react";
import { experiences } from "../../data/portfolio";
import { Briefcase, MapPin, Calendar } from "lucide-react";

const COLOR_MAP = {
  saffron: { primary: "#ff6b1a", glow: "rgba(255,107,26,0.25)", border: "rgba(255,107,26,0.3)", bg: "rgba(255,107,26,0.06)" },
  violet: { primary: "#8b5cf6", glow: "rgba(139,92,246,0.25)", border: "rgba(139,92,246,0.3)", bg: "rgba(139,92,246,0.06)" },
  ganga: { primary: "#22d3ee", glow: "rgba(34,211,238,0.25)", border: "rgba(34,211,238,0.3)", bg: "rgba(34,211,238,0.05)" },
};

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-radial-ganga pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="font-cinzel text-xs mb-3 tracking-widest" style={{ color: "#22d3ee", letterSpacing: "5px" }}>
            🔱 THE SACRED JOURNEY
          </p>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-4">
            <span style={{ color: "#e8e0f0" }}>Professional </span>
            <span className="shimmer-saffron">Experience</span>
          </h2>
          <p className="max-w-lg mx-auto" style={{ color: "rgba(232,224,240,0.5)", fontSize: "14px" }}>
            Each chapter, a sacred step on the path — guided by Mahadev's unwavering light
          </p>
          <div className="divine-separator max-w-xs mx-auto mt-4" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line — the Ganga river of time */}
          <div
            className="absolute left-8 top-0 bottom-0 w-px hidden md:block"
            style={{
              background: "linear-gradient(180deg, rgba(255,107,26,0.6), rgba(139,92,246,0.6), rgba(34,211,238,0.6), transparent)",
            }}
          />

          <div className="space-y-8">
            {experiences.map((exp, index) => {
              const c = COLOR_MAP[exp.color];
              const delay = index * 150;

              return (
                <div
                  key={index}
                  className={`relative flex gap-6 md:gap-8 transition-all duration-700 ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${delay}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="hidden md:flex flex-col items-center shrink-0 w-16">
                    <div
                      className="w-4 h-4 rounded-full mt-8 relative z-10 animate-glow-pulse"
                      style={{
                        background: c.primary,
                        boxShadow: `0 0 12px ${c.glow}, 0 0 24px ${c.glow}`,
                      }}
                    >
                      {/* Ripple */}
                      <span
                        className="absolute inset-0 rounded-full"
                        style={{
                          border: `2px solid ${c.primary}`,
                          animation: "ripple 2.5s ease-out infinite",
                        }}
                      />
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className="flex-1 p-6 md:p-7 rounded-2xl group transition-all duration-400 hover:scale-[1.01]"
                    style={{
                      background: c.bg,
                      border: `1px solid ${c.border}`,
                      boxShadow: `0 0 0 rgba(0,0,0,0)`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${c.glow}, 0 8px 40px rgba(0,0,0,0.3)`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 rgba(0,0,0,0)";
                    }}
                  >
                    {/* Top row */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                      <div>
                        <h3
                          className="font-cinzel font-bold text-lg mb-1"
                          style={{ color: c.primary }}
                        >
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Briefcase size={13} style={{ color: "rgba(232,224,240,0.5)" }} />
                          <span className="font-semibold" style={{ color: "#e8e0f0", fontSize: "14px" }}>
                            {exp.company}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
                        <div
                          className="flex items-center gap-1.5 px-3 py-1 rounded-full"
                          style={{
                            background: `${c.primary}15`,
                            border: `1px solid ${c.border}`,
                          }}
                        >
                          <Calendar size={12} style={{ color: c.primary }} />
                          <span className="font-cinzel text-xs" style={{ color: c.primary, letterSpacing: "1px" }}>
                            {exp.period}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} style={{ color: "rgba(232,224,240,0.35)" }} />
                          <span style={{ color: "rgba(232,224,240,0.4)", fontSize: "12px" }}>
                            {exp.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className="mb-5 leading-relaxed"
                      style={{ color: "rgba(232,224,240,0.65)", fontSize: "14px", lineHeight: "1.85" }}
                    >
                      {exp.description}
                    </p>

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <span
                          key={tech}
                          className="tech-pill"
                          style={{
                            background: `${c.primary}12`,
                            border: `1px solid ${c.border}`,
                            color: c.primary,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
