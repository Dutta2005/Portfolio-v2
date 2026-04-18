import { useRef, useEffect, useState } from "react";
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

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 pointer-events-none opacity-4">
        <MandalaRingIcon size={500} className="text-gold animate-mandala-reverse" />
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

        {/* Featured projects — large cards */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {featured.map((project, index) => {
            const c = COLOR_MAP[project.color];
            const isHovered = hoveredCard === index;
            const delay = index * 120;

            return (
              <div
                key={project.title}
                className={`relative rounded-2xl overflow-hidden transition-all duration-500 cursor-default ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                style={{
                  transitionDelay: `${delay}ms`,
                  background: c.bg,
                  border: `1px solid ${isHovered ? c.primary + "60" : c.border}`,
                  boxShadow: isHovered ? `0 0 40px ${c.glow}, 0 20px 60px rgba(0,0,0,0.4)` : "none",
                  transform: isHovered ? "translateY(-4px) scale(1.01)" : "none",
                  backdropFilter: "blur(20px)",
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Top accent line */}
                <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${c.primary}, transparent)` }} />

                {/* Featured + color badge */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5">
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

                <div className="p-6">
                  {/* Title */}
                  <h3
                    className="font-cinzel font-bold text-xl mb-2 transition-colors duration-300"
                    style={{ color: isHovered ? c.primary : "#e8e0f0" }}
                  >
                    {project.title}
                  </h3>

                  {/* Divine tagline */}
                  <p
                    className="font-cinzel italic text-xs mb-4 leading-relaxed"
                    style={{ color: `${c.primary}90`, letterSpacing: "0.5px" }}
                  >
                    "{project.tagline}"
                  </p>

                  {/* Description */}
                  <p
                    className="mb-5 leading-relaxed"
                    style={{ color: "rgba(232,224,240,0.6)", fontSize: "13.5px", lineHeight: "1.8" }}
                  >
                    {project.description}
                  </p>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="tech-pill"
                        style={{
                          background: `${c.primary}10`,
                          border: `1px solid ${c.primary}30`,
                          color: c.primary,
                          fontSize: "11px",
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
          })}
        </div>

        {/* Rest of projects — smaller cards grid */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {rest.map((project, index) => {
            const c = COLOR_MAP[project.color];
            const cardIndex = featured.length + index;
            const isHovered = hoveredCard === cardIndex;
            const delay = (featured.length + index) * 80;

            return (
              <div
                key={project.title}
                className={`p-5 rounded-2xl transition-all duration-400 cursor-default ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                style={{
                  transitionDelay: `${delay}ms`,
                  background: isHovered ? c.bg : "rgba(14,14,26,0.7)",
                  border: `1px solid ${isHovered ? c.primary + "50" : "rgba(255,255,255,0.06)"}`,
                  boxShadow: isHovered ? `0 0 25px ${c.glow}` : "none",
                  transform: isHovered ? "translateY(-3px)" : "none",
                  backdropFilter: "blur(20px)",
                }}
                onMouseEnter={() => setHoveredCard(cardIndex)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className="w-2 h-2 rounded-full mb-3"
                  style={{ background: c.primary, boxShadow: `0 0 8px ${c.glow}` }}
                />

                <h3
                  className="font-cinzel font-bold text-sm mb-2 transition-colors duration-300"
                  style={{ color: isHovered ? c.primary : "#e8e0f0" }}
                >
                  {project.title}
                </h3>

                <p
                  className="mb-4"
                  style={{ color: "rgba(232,224,240,0.5)", fontSize: "12.5px", lineHeight: "1.7" }}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
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

                <div className="flex gap-2">
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
          })}
        </div>
      </div>
    </section>
  );
}
