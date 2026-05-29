import { useState, useEffect, useRef, useCallback } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ChevronDown, ScrollText } from "lucide-react";
import { MandalaRingIcon, TrishulIcon, BigTrishulBg } from "../icons/ShivaIcons";

const ROLES = [
  "Full Stack Developer",
  "AI Engineer",
  "Open Source Mentor",
  "SaaS Builder",
  "Mahadev Devotee",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const role = ROLES[roleIndex];
    const speed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setRoleIndex((i) => (i + 1) % ROLES.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // Mouse parallax tracking
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  // Parallax offset calculations
  const px = (mousePos.x - 0.5) * 2;
  const py = (mousePos.y - 0.5) * 2;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden perspective-container"
      onMouseMove={handleMouseMove}
    >
      {/* Deep background gradient — shifts with mouse */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(ellipse at ${30 + px * 10}% ${50 + py * 10}%, rgba(255,107,26,0.08) 0%, transparent 50%),
            radial-gradient(ellipse at ${70 - px * 10}% ${30 - py * 10}%, rgba(139,92,246,0.10) 0%, transparent 50%),
            radial-gradient(ellipse at 50% ${80 + py * 5}%, rgba(34,211,238,0.06) 0%, transparent 50%)
          `,
        }}
      />

      {/* Sacred geometry — Outer large mandala (left) with 3D */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 pointer-events-none preserve-3d"
        style={{
          color: "rgba(255,107,26,0.12)",
          transform: `translate(-25%, -50%) translateZ(-50px) rotateY(${px * 5}deg)`,
          transition: "transform 1.5s ease-out",
        }}
      >
        <MandalaRingIcon size={500} className="animate-mandala-slow" />
      </div>

      {/* Sacred geometry — Inner mandala (right) with 3D */}
      <div
        className="absolute right-0 top-1/4 translate-x-1/4 pointer-events-none preserve-3d"
        style={{
          color: "rgba(139,92,246,0.10)",
          transform: `translate(25%, 0) translateZ(-30px) rotateY(${px * -3}deg)`,
          transition: "transform 1.5s ease-out",
        }}
      >
        <MandalaRingIcon size={380} className="animate-mandala-reverse" />
      </div>

      {/* ── Giant Background Trishul — 3D Rotation ── */}
      <div
        className="absolute pointer-events-none mt-50 preserve-3d"
        style={{
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -52%) rotateY(${px * 8}deg) rotateX(${py * -4}deg)`,
          transition: "transform 1.2s ease-out",
          zIndex: 1,
          color: "#ff6b1a",
          opacity: 0.12,
          filter: `
            drop-shadow(0 0 18px rgba(255, 107, 26, 0.9))
            drop-shadow(0 0 50px rgba(255, 107, 26, 0.55))
            drop-shadow(0 0 100px rgba(255, 107, 26, 0.25))
          `,
          animation: "trishul-bg-breathe 8s ease-in-out infinite",
        }}
      >
        <BigTrishulBg size={780} />
      </div>

      {/* Center glowing orb — follows mouse */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(245,158,11,0.06) 0%, transparent 50%)`,
          transition: "background 0.5s ease-out",
        }}
      />

      {/* Sacred fire embers rising */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {mounted && [...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${10 + Math.random() * 80}%`,
              bottom: "-20px",
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: [
                "rgba(255, 107, 26, 0.8)",
                "rgba(245, 158, 11, 0.7)",
                "rgba(139, 92, 246, 0.5)",
              ][i % 3],
              animation: `ember-rise ${8 + Math.random() * 12}s linear infinite`,
              animationDelay: `${Math.random() * 8}s`,
              filter: `blur(${Math.random() * 1}px)`,
              boxShadow: `0 0 6px ${
                ["rgba(255, 107, 26, 0.6)", "rgba(245, 158, 11, 0.5)", "rgba(139, 92, 246, 0.4)"][i % 3]
              }`,
            }}
          />
        ))}
      </div>

      {/* Main content — in 3D space */}
      <div
        className={`relative z-10 text-center px-6 max-w-5xl mx-auto preserve-3d transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
        style={{
          transform: mounted
            ? `translateZ(20px) rotateX(${py * -2}deg) rotateY(${px * 2}deg)`
            : "translateZ(20px) translateY(48px)",
          transition: "transform 1.2s ease-out, opacity 1s ease",
        }}
      >
        {/* Sacred badge */}
        <div className="flex justify-center mb-8 mt-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-cinzel text-xs font-semibold tracking-widest mt-14"
            style={{
              background: "rgba(255,107,26,0.08)",
              border: "1px solid rgba(255,107,26,0.3)",
              color: "#ff6b1a",
              boxShadow: "0 0 20px rgba(255,107,26,0.12)",
              letterSpacing: "3px",
              animation: mounted ? "float-3d-gentle 6s ease-in-out infinite" : "none",
            }}
          >
            <span className="animate-glow-pulse">🔱</span>
            <span>OM NAMAH SHIVAYA</span>
            <span className="animate-glow-pulse">🔱</span>
          </div>
        </div>

        {/* Main greeting */}
        <div className="mb-4">
          <p
            className="font-cinzel text-xs sm:text-sm tracking-widest mb-3"
            style={{ color: "rgba(139,92,246,0.8)", letterSpacing: "5px" }}
          >
            BLESSED BY THE COSMIC ARCHITECT
          </p>
        </div>

        {/* Name — 3D letter-by-letter cascade */}
        <h1
          className="font-cinzel font-black mb-4 leading-none tracking-tight"
          style={{
            fontSize: "clamp(3rem, 10vw, 7.5rem)",
          }}
        >
          {"RAJ DUTTA".split("").map((char, i) => (
            <span
              key={i}
              className="inline-block shimmer-gold"
              style={{
                animation: mounted
                  ? `letter-cascade 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.06}s both`
                  : "none",
                display: char === " " ? "inline" : "inline-block",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Animated Trishul divider */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px flex-1 max-w-20" style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,26,0.5))" }} />
          <div className="animate-trishul-glow preserve-3d" style={{ color: "#ff6b1a", animation: "trishul-glow 2.5s ease-in-out infinite, mandala-spin-3d 8s linear infinite" }}>
            <TrishulIcon size={24} />
          </div>
          <div
            className="font-cinzel text-xs tracking-widest animate-text-glow-gold"
            style={{ color: "#f59e0b", letterSpacing: "4px" }}
          >
            HAR HAR MAHADEV
          </div>
          <div className="animate-trishul-glow preserve-3d" style={{ color: "#ff6b1a", animation: "trishul-glow 2.5s ease-in-out infinite, mandala-spin-3d 8s linear infinite" }}>
            <TrishulIcon size={24} />
          </div>
          <div className="h-px flex-1 max-w-20" style={{ background: "linear-gradient(90deg, rgba(255,107,26,0.5), transparent)" }} />
        </div>

        {/* Typewriter role */}
        <div className="mb-6 h-10 flex items-center justify-center">
          <p
            className="font-cinzel font-semibold text-xl sm:text-2xl md:text-3xl"
            style={{ color: "#e8e0f0", letterSpacing: "2px" }}
          >
            <span style={{ color: "#8b5cf6" }}>{displayText}</span>
            <span
              className="animate-glow-pulse"
              style={{ color: "#8b5cf6", borderRight: "2px solid #8b5cf6", marginLeft: "2px" }}
            >
              |
            </span>
          </p>
        </div>

        {/* Description */}
        <p
          className="max-w-2xl mx-auto mb-10 leading-relaxed text-base md:text-lg"
          style={{ color: "rgba(232,224,240,0.65)" }}
        >
          Like Mahadev who sustains the entire cosmos in absolute stillness, I craft{" "}
          <span style={{ color: "#ff6b1a" }}>scalable web platforms</span>,{" "}
          <span style={{ color: "#8b5cf6" }}>AI-powered tools</span>, and{" "}
          <span style={{ color: "#22d3ee" }}>SaaS products</span> — engineered with cosmic
          precision and unwavering purpose.
        </p>

        {/* CTA Buttons — 3D hover effects */}
        <div className="flex flex-wrap gap-4 justify-center mb-14">
          <button
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative px-8 py-3.5 rounded-full font-cinzel font-bold text-sm tracking-widest overflow-hidden cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #ff6b1a, #ea580c)",
              color: "#ffffff",
              boxShadow: "0 0 30px rgba(255,107,26,0.4), 0 4px 20px rgba(0,0,0,0.4)",
              letterSpacing: "2.5px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "perspective(600px) translateZ(10px) scale(1.05)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 50px rgba(255,107,26,0.6), 0 10px 40px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "perspective(600px) translateZ(0) scale(1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(255,107,26,0.4), 0 4px 20px rgba(0,0,0,0.4)";
            }}
          >
            <span className="relative z-10">🔱 VIEW MY WORK</span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, #ff8c42, #ff6b1a)" }}
            />
          </button>

          <a
            href="https://github.com/Dutta2005"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-cinzel font-semibold text-sm tracking-widest"
            style={{
              background: "transparent",
              border: "1px solid rgba(139,92,246,0.5)",
              color: "#8b5cf6",
              boxShadow: "0 0 20px rgba(139,92,246,0.2)",
              letterSpacing: "2px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = "perspective(600px) translateZ(8px) scale(1.05)";
              el.style.borderColor = "rgba(139,92,246,0.9)";
              el.style.boxShadow = "0 0 30px rgba(139,92,246,0.4)";
              el.style.background = "rgba(139,92,246,0.08)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = "perspective(600px) translateZ(0) scale(1)";
              el.style.borderColor = "rgba(139,92,246,0.5)";
              el.style.boxShadow = "0 0 20px rgba(139,92,246,0.2)";
              el.style.background = "transparent";
            }}
          >
            <FaGithub size={16} />
            GITHUB
          </a>

          <a
            href="https://www.linkedin.com/in/rajdutta062005/"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-cinzel font-semibold text-sm tracking-widest"
            style={{
              background: "transparent",
              border: "1px solid rgba(34,211,238,0.4)",
              color: "#22d3ee",
              boxShadow: "0 0 20px rgba(34,211,238,0.15)",
              letterSpacing: "2px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = "perspective(600px) translateZ(8px) scale(1.05)";
              el.style.borderColor = "rgba(34,211,238,0.9)";
              el.style.boxShadow = "0 0 30px rgba(34,211,238,0.3)";
              el.style.background = "rgba(34,211,238,0.06)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = "perspective(600px) translateZ(0) scale(1)";
              el.style.borderColor = "rgba(34,211,238,0.4)";
              el.style.boxShadow = "0 0 20px rgba(34,211,238,0.15)";
              el.style.background = "transparent";
            }}
          >
            <FaLinkedin size={16} />
            LINKEDIN
          </a>

          {/* ✨ View Resume — Sacred Scroll of Destiny */}
          <a
            href={import.meta.env.VITE_RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="group relative flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-cinzel font-bold text-sm tracking-widest overflow-hidden cursor-pointer"
            style={{
              background: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(255,107,26,0.08))",
              border: "1px solid rgba(245,158,11,0.5)",
              color: "#f59e0b",
              boxShadow: "0 0 24px rgba(245,158,11,0.2), inset 0 0 20px rgba(245,158,11,0.04)",
              letterSpacing: "2px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease, color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.transform = "perspective(600px) translateZ(8px) scale(1.05)";
              el.style.borderColor = "rgba(245,158,11,0.9)";
              el.style.boxShadow = "0 0 40px rgba(245,158,11,0.45), 0 0 80px rgba(255,107,26,0.15), inset 0 0 30px rgba(245,158,11,0.08)";
              el.style.background = "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(255,107,26,0.12))";
              el.style.color = "#fcd34d";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.transform = "perspective(600px) translateZ(0) scale(1)";
              el.style.borderColor = "rgba(245,158,11,0.5)";
              el.style.boxShadow = "0 0 24px rgba(245,158,11,0.2), inset 0 0 20px rgba(245,158,11,0.04)";
              el.style.background = "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(255,107,26,0.08))";
              el.style.color = "#f59e0b";
            }}
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(105deg, transparent 30%, rgba(245,158,11,0.15) 50%, transparent 70%)",
              }}
            />
            <ScrollText size={15} className="relative z-10 animate-glow-pulse" />
            <span className="relative z-10">SACRED SCROLL</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 animate-float-3d">
          <p
            className="font-cinzel text-xs tracking-widest"
            style={{ color: "rgba(107,114,128,0.6)", letterSpacing: "3px" }}
          >
            DESCEND INTO THE COSMOS
          </p>
          <button
            onClick={scrollToAbout}
            className="cursor-pointer"
            style={{ color: "rgba(255,107,26,0.6)" }}
          >
            <ChevronDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
