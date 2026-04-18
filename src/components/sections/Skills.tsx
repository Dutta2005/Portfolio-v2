import { useRef, useEffect, useState } from "react";
import { skillCategories } from "../../data/portfolio";
import { MandalaRingIcon } from "../icons/ShivaIcons";

const CATEGORY_META: Record<string, { color: string; icon: string; glow: string }> = {
  Languages: { color: "#ff6b1a", icon: "⚡", glow: "rgba(255,107,26,0.3)" },
  Frontend: { color: "#22d3ee", icon: "🎨", glow: "rgba(34,211,238,0.3)" },
  Backend: { color: "#8b5cf6", icon: "🛡️", glow: "rgba(139,92,246,0.3)" },
  "Databases & ORM": { color: "#f59e0b", icon: "🗄️", glow: "rgba(245,158,11,0.3)" },
  "AI & Agentic": { color: "#ec4899", icon: "🧠", glow: "rgba(236,72,153,0.3)" },
  "Cloud & Deploy": { color: "#22d3ee", icon: "☁️", glow: "rgba(34,211,238,0.3)" },
  "Tools & Ecosystem": { color: "#a78bfa", icon: "🔧", glow: "rgba(167,139,250,0.3)" },
};

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const categories = Object.entries(skillCategories);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-radial-violet pointer-events-none" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 pointer-events-none opacity-5">
        <MandalaRingIcon size={500} className="text-violet animate-mandala" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="font-cinzel text-xs mb-3 tracking-widest" style={{ color: "#8b5cf6", letterSpacing: "5px" }}>
            🔱 DIVINE ARSENAL
          </p>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-4" style={{ color: "#e8e0f0" }}>
            Skills &{" "}
            <span className="shimmer-saffron">Technologies</span>
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: "rgba(232,224,240,0.5)", fontSize: "14px" }}>
            Like Mahadev's infinite forms — each skill a sacred weapon forged in the fire of creation
          </p>
          <div className="divine-separator max-w-xs mx-auto mt-4" />
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map(([category, skills], catIndex) => {
            const meta = CATEGORY_META[category] || { color: "#8b5cf6", icon: "✦", glow: "rgba(139,92,246,0.3)" };
            const isActive = activeCategory === category;
            const delay = catIndex * 100;

            return (
              <div
                key={category}
                className={`p-6 rounded-2xl transition-all duration-500 cursor-default ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${delay}ms`,
                  background: isActive ? `${meta.color}08` : "rgba(14,14,26,0.6)",
                  border: `1px solid ${isActive ? meta.color + "40" : "rgba(255,255,255,0.06)"}`,
                  boxShadow: isActive ? `0 0 30px ${meta.glow}` : "none",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                }}
                onMouseEnter={() => setActiveCategory(category)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all duration-300"
                    style={{
                      background: `${meta.color}15`,
                      border: `1px solid ${meta.color}30`,
                      boxShadow: isActive ? `0 0 14px ${meta.glow}` : "none",
                    }}
                  >
                    {meta.icon}
                  </div>
                  <h3
                    className="font-cinzel font-bold text-sm tracking-widest"
                    style={{ color: isActive ? meta.color : "#e8e0f0", letterSpacing: "2px", transition: "color 0.3s" }}
                  >
                    {category.toUpperCase()}
                  </h3>
                </div>

                {/* Skill pills */}
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className="tech-pill transition-all duration-300"
                      style={{
                        background: isActive ? `${meta.color}15` : "rgba(255,255,255,0.04)",
                        border: `1px solid ${isActive ? meta.color + "40" : "rgba(255,255,255,0.08)"}`,
                        color: isActive ? meta.color : "rgba(232,224,240,0.65)",
                        boxShadow: isActive ? `0 0 8px ${meta.glow}` : "none",
                        transitionDelay: `${skillIndex * 30}ms`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Total skills counter */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div
            className="inline-flex items-center gap-4 px-8 py-4 rounded-full"
            style={{
              background: "rgba(255,107,26,0.06)",
              border: "1px solid rgba(255,107,26,0.2)",
            }}
          >
            <span className="font-cinzel text-xs tracking-widest" style={{ color: "rgba(232,224,240,0.5)", letterSpacing: "3px" }}>
              TOTAL DIVINE WEAPONS
            </span>
            <span
              className="font-cinzel-deco font-bold text-2xl animate-text-glow-gold"
              style={{ color: "#f59e0b" }}
            >
              {Object.values(skillCategories).flat().length}+
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
