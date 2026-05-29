import { useRef, useEffect, useState, useCallback } from "react";
import { projects } from "../../data/portfolio";
import { ExternalLink, Star } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { MandalaRingIcon } from "../icons/ShivaIcons";

const COLOR_MAP = {
  saffron: { primary: "#ff6b1a", glow: "rgba(255,107,26,0.25)", border: "rgba(255,107,26,0.25)", bg: "rgba(255,107,26,0.05)" },
  violet: { primary: "#8b5cf6", glow: "rgba(139,92,246,0.25)", border: "rgba(139,92,246,0.25)", bg: "rgba(139,92,246,0.05)" },
  gold: { primary: "#f59e0b", glow: "rgba(245,158,11,0.25)", border: "rgba(245,158,11,0.25)", bg: "rgba(245,158,11,0.04)" },
  ganga: { primary: "#22d3ee", glow: "rgba(34,211,238,0.2)", border: "rgba(34,211,238,0.25)", bg: "rgba(34,211,238,0.04)" },
};

function ProjectCard3D({
  project,
  index,
  visible,
  isFeatured,
}: {
  project: (typeof projects)[0];
  index: number;
  visible: boolean;
  isFeatured: boolean;
}) {
  const c = COLOR_MAP[project.color];
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const delay = index * 120;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * (isFeatured ? 12 : 16);
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * (isFeatured ? -12 : -16);
      cardRef.current.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateZ(${isFeatured ? 15 : 10}px) scale(1.02)`;

      // Move shine
      const shine = cardRef.current.querySelector(".tilt-shine") as HTMLElement | null;
      if (shine) {
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        shine.style.opacity = "1";
        shine.style.background = `radial-gradient(circle at ${px}px ${py}px, rgba(255,255,255,0.1) 0%, transparent 60%)`;
      }
    },
    [isFeatured]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateZ(0) scale(1)";
      const shine = cardRef.current.querySelector(".tilt-shine") as HTMLElement | null;
      if (shine) shine.style.opacity = "0";
    }
  }, []);

  if (isFeatured) {
    return (
      <div
        ref={cardRef}
        className={`relative rounded-2xl overflow-hidden cursor-default ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          animation: visible ? `flip-in-y 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms both` : "none",
          background: c.bg,
          border: `1px solid ${isHovered ? c.primary + "60" : c.border}`,
          boxShadow: isHovered ? `0 25px 60px rgba(0,0,0,0.5), 0 0 50px ${c.glow}` : "none",
          backdropFilter: "blur(20px)",
          transformStyle: "preserve-3d",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
          willChange: "transform",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Shine layer */}
        <div className="tilt-shine absolute inset-0 rounded-2xl pointer-events-none z-10" style={{ opacity: 0, transition: "opacity 0.3s ease" }} />

        {/* Top accent line with glow */}
        <div
          className="h-0.5 w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${c.primary}, transparent)`,
            boxShadow: isHovered ? `0 0 10px ${c.glow}` : "none",
          }}
        />

        {/* Featured badge — floats above card */}
        <div
          className="absolute top-4 right-4 flex items-center gap-1.5 z-20"
          style={{ transform: "translateZ(25px)" }}
        >
          <div
            className="flex items-center gap-1 px-2 py-0.5 rounded-full"
            style={{ background: `${c.primary}20`, border: `1px solid ${c.primary}40` }}
          >
            <Star size={10} style={{ color: c.primary }} />
            <span className="font-cinzel" style={{ fontSize: "9px", color: c.primary, letterSpacing: "1.5px" }}>
              FEATURED
            </span>
          </div>
        </div>

        <div className="p-6 relative" style={{ transform: "translateZ(10px)" }}>
          <h3
            className="font-cinzel font-bold text-xl mb-2 transition-colors duration-300"
            style={{ color: isHovered ? c.primary : "#e8e0f0" }}
          >
            {project.title}
          </h3>

          <p
            className="font-cinzel italic text-xs mb-4 leading-relaxed"
            style={{ color: `${c.primary}90`, letterSpacing: "0.5px" }}
          >
            "{project.tagline}"
          </p>

          <p
            className="mb-5 leading-relaxed"
            style={{ color: "rgba(232,224,240,0.6)", fontSize: "13.5px", lineHeight: "1.8" }}
          >
            {project.description}
          </p>

          {/* Tech pills with cascade animation */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tech.map((tech, ti) => (
              <span
                key={tech}
                className="tech-pill transition-all duration-300"
                style={{
                  background: `${c.primary}10`,
                  border: `1px solid ${c.primary}30`,
                  color: c.primary,
                  fontSize: "11px",
                  transform: isHovered ? `translateY(-2px) translateZ(${5 + ti}px)` : "translateY(0)",
                  transitionDelay: `${ti * 30}ms`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-cinzel text-xs font-semibold tracking-wider transition-all duration-300 hover:scale-105"
              style={{
                background: isHovered ? `${c.primary}20` : "rgba(255,255,255,0.05)",
                border: `1px solid ${isHovered ? c.primary + "50" : "rgba(255,255,255,0.08)"}`,
                color: isHovered ? c.primary : "rgba(232,224,240,0.6)",
                letterSpacing: "1.5px",
              }}
            >
              <FaGithub size={13} />
              SOURCE
            </a>
            {project.live && project.live !== project.github && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-cinzel text-xs font-semibold tracking-wider transition-all duration-300 hover:scale-105"
                style={{
                  background: isHovered ? `${c.primary}20` : "rgba(255,255,255,0.05)",
                  border: `1px solid ${isHovered ? c.primary + "50" : "rgba(255,255,255,0.08)"}`,
                  color: isHovered ? c.primary : "rgba(232,224,240,0.6)",
                  letterSpacing: "1.5px",
                }}
              >
                <ExternalLink size={13} />
                LIVE
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Non-featured — smaller 3D card
  return (
    <div
      ref={cardRef}
      className={`p-5 rounded-2xl cursor-default relative ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        animation: visible ? `slide-from-depth 0.7s cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms both` : "none",
        background: isHovered ? c.bg : "rgba(14,14,26,0.7)",
        border: `1px solid ${isHovered ? c.primary + "50" : "rgba(255,255,255,0.06)"}`,
        boxShadow: isHovered ? `0 20px 50px rgba(0,0,0,0.4), 0 0 30px ${c.glow}` : "none",
        backdropFilter: "blur(20px)",
        transformStyle: "preserve-3d",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease, transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="tilt-shine absolute inset-0 rounded-2xl pointer-events-none z-10" style={{ opacity: 0, transition: "opacity 0.3s ease" }} />

      <div
        className="w-2 h-2 rounded-full mb-3"
        style={{
          background: c.primary,
          boxShadow: `0 0 8px ${c.glow}`,
          transform: "translateZ(10px)",
        }}
      />

      <h3
        className="font-cinzel font-bold text-sm mb-2 transition-colors duration-300"
        style={{ color: isHovered ? c.primary : "#e8e0f0", transform: "translateZ(8px)" }}
      >
        {project.title}
      </h3>

      <p
        className="mb-4"
        style={{ color: "rgba(232,224,240,0.5)", fontSize: "12.5px", lineHeight: "1.7", transform: "translateZ(5px)" }}
      >
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1 mb-4" style={{ transform: "translateZ(6px)" }}>
        {project.tech.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="tech-pill"
            style={{
              background: `${c.primary}10`,
              border: `1px solid ${c.primary}25`,
              color: c.primary,
              fontSize: "10px",
            }}
          >
            {tech}
          </span>
        ))}
        {project.tech.length > 3 && (
          <span
            className="tech-pill"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(232,224,240,0.4)",
              fontSize: "10px",
            }}
          >
            +{project.tech.length - 3}
          </span>
        )}
      </div>

      <div className="flex gap-2" style={{ transform: "translateZ(8px)" }}>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs transition-all duration-200 hover:scale-105"
          style={{ color: isHovered ? c.primary : "rgba(232,224,240,0.4)" }}
        >
          <FaGithub size={12} />
          <span className="font-cinzel" style={{ letterSpacing: "1px", fontSize: "10px" }}>CODE</span>
        </a>
        {project.live && project.live !== project.github && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs transition-all duration-200 hover:scale-105"
            style={{ color: isHovered ? c.primary : "rgba(232,224,240,0.4)" }}
          >
            <ExternalLink size={12} />
            <span className="font-cinzel" style={{ letterSpacing: "1px", fontSize: "10px" }}>LIVE</span>
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-radial-saffron pointer-events-none" />
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 pointer-events-none opacity-4 preserve-3d">
        <MandalaRingIcon size={500} className="text-gold animate-mandala-3d" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <p className="font-cinzel text-xs mb-3 tracking-widest" style={{ color: "#f59e0b", letterSpacing: "5px" }}>
            🔱 DIVINE CREATIONS
          </p>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-4">
            <span style={{ color: "#e8e0f0" }}>Sacred </span>
            <span className="shimmer-gold">Projects</span>
          </h2>
          <p className="max-w-xl mx-auto" style={{ color: "rgba(232,224,240,0.5)", fontSize: "14px" }}>
            Each creation — a digital offering at the feet of Lord Mahadev, built with devotion and mastery
          </p>
          <div className="divine-separator max-w-xs mx-auto mt-4" />
        </div>

        {/* Trishul divider before featured */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px flex-1 max-w-32" style={{ background: "linear-gradient(90deg, transparent, rgba(245,158,11,0.3))" }} />
          <span className="font-cinzel text-xs tracking-widest" style={{ color: "rgba(245,158,11,0.5)", letterSpacing: "3px" }}>
            🔱 FEATURED OFFERINGS
          </span>
          <div className="h-px flex-1 max-w-32" style={{ background: "linear-gradient(90deg, rgba(245,158,11,0.3), transparent)" }} />
        </div>

        {/* Featured projects — 3D cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {featured.map((project, index) => (
            <ProjectCard3D
              key={project.title}
              project={project}
              index={index}
              visible={visible}
              isFeatured={true}
            />
          ))}
        </div>

        {/* Trishul divider before rest */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px flex-1 max-w-32" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.3))" }} />
          <span className="font-cinzel text-xs tracking-widest" style={{ color: "rgba(139,92,246,0.4)", letterSpacing: "3px" }}>
            MORE CREATIONS
          </span>
          <div className="h-px flex-1 max-w-32" style={{ background: "linear-gradient(90deg, rgba(139,92,246,0.3), transparent)" }} />
        </div>

        {/* Rest of projects — smaller 3D cards */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {rest.map((project, index) => (
            <ProjectCard3D
              key={project.title}
              project={project}
              index={featured.length + index}
              visible={visible}
              isFeatured={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
