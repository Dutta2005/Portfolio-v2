import { useRef, useEffect, useState, useCallback } from "react";
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

function SkillCard({
  category,
  skills,
  catIndex,
  visible,
}: {
  category: string;
  skills: string[];
  catIndex: number;
  visible: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const meta = CATEGORY_META[category] || { color: "#8b5cf6", icon: "✦", glow: "rgba(139,92,246,0.3)" };
  const delay = catIndex * 100;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
      cardRef.current.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) scale3d(1.03, 1.03, 1.03)`;
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)";
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={`p-6 rounded-2xl cursor-default ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        transitionDelay: `${delay}ms`,
        background: isHovered ? `${meta.color}08` : "rgba(14,14,26,0.6)",
        border: `1px solid ${isHovered ? meta.color + "40" : "rgba(255,255,255,0.06)"}`,
        boxShadow: isHovered ? `0 25px 60px rgba(0,0,0,0.4), 0 0 40px ${meta.glow}` : "none",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        transformStyle: "preserve-3d",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease`,
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Holographic shine overlay */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: isHovered
            ? "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.03) 100%)"
            : "none",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Category header */}
      <div className="flex items-center gap-3 mb-5 relative" style={{ transform: "translateZ(20px)" }}>
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all duration-300"
          style={{
            background: `${meta.color}15`,
            border: `1px solid ${meta.color}30`,
            boxShadow: isHovered ? `0 0 14px ${meta.glow}` : "none",
          }}
        >
          {meta.icon}
        </div>
        <h3
          className="font-cinzel font-bold text-sm tracking-widest"
          style={{ color: isHovered ? meta.color : "#e8e0f0", letterSpacing: "2px", transition: "color 0.3s" }}
        >
          {category.toUpperCase()}
        </h3>
      </div>

      {/* Skill pills */}
      <div className="flex flex-wrap gap-2 relative" style={{ transform: "translateZ(10px)" }}>
        {skills.map((skill, skillIndex) => (
          <span
            key={skill}
            className="tech-pill transition-all duration-300"
            style={{
              background: isHovered ? `${meta.color}15` : "rgba(255,255,255,0.04)",
              border: `1px solid ${isHovered ? meta.color + "40" : "rgba(255,255,255,0.08)"}`,
              color: isHovered ? meta.color : "rgba(232,224,240,0.65)",
              boxShadow: isHovered ? `0 0 8px ${meta.glow}` : "none",
              transitionDelay: `${skillIndex * 30}ms`,
              transform: isHovered ? "translateZ(5px)" : "translateZ(0)",
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

// Animated counter component
function AnimatedCounter({ target, visible }: { target: number; visible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let current = 0;
    const step = Math.ceil(target / 30);
    const iv = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(iv);
      } else {
        setCount(current);
      }
    }, 40);
    return () => clearInterval(iv);
  }, [visible, target]);

  return (
    <span
      className="font-cinzel-deco font-bold text-2xl animate-text-glow-gold inline-block"
      style={{
        color: "#f59e0b",
        animation: visible ? "counter-flip 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards" : "none",
        transformStyle: "preserve-3d",
      }}
    >
      {count}+
    </span>
  );
}

export default function Skills() {
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

  const categories = Object.entries(skillCategories);
  const totalSkills = Object.values(skillCategories).flat().length;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-radial-violet pointer-events-none" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 pointer-events-none opacity-5 preserve-3d">
        <MandalaRingIcon size={500} className="text-violet animate-mandala-3d" />
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

        {/* Skills grid — 3D tilt cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map(([category, skills], catIndex) => (
            <SkillCard
              key={category}
              category={category}
              skills={skills}
              catIndex={catIndex}
              visible={visible}
            />
          ))}
        </div>

        {/* Total skills counter with 3D flip */}
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
            <AnimatedCounter target={totalSkills} visible={visible} />
          </div>
        </div>
      </div>
    </section>
  );
}
