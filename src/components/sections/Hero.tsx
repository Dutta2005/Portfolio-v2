import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ChevronDown, ScrollText } from "lucide-react";
import { MandalaRingIcon, TrishulIcon } from "../icons/ShivaIcons";

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

  useEffect(() => {
    setMounted(true);
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

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Deep background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(255,107,26,0.08) 0%, transparent 50%), radial-gradient(ellipse at 70% 30%, rgba(139,92,246,0.10) 0%, transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(34,211,238,0.06) 0%, transparent 50%)",
        }}
      />

      {/* Sacred geometry — Outer large mandala (left) */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 pointer-events-none"
        style={{ color: "rgba(255,107,26,0.12)" }}
      >
        <MandalaRingIcon size={500} className="animate-mandala-slow" />
      </div>

      {/* Sacred geometry — Inner mandala (right) */}
      <div
        className="absolute right-0 top-1/4 translate-x-1/4 pointer-events-none"
        style={{ color: "rgba(139,92,246,0.10)" }}
      >
        <MandalaRingIcon size={380} className="animate-mandala-reverse" />
      </div>

      {/* Center glowing orb */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(245,158,11,0.04) 0%, transparent 60%)",
        }}
      />

      {/* Main content */}
      <div
        className={`relative z-10 text-center px-6 max-w-5xl mx-auto transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
      >
        {/* Sacred badge */}
        <div className="flex justify-center mb-8">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-cinzel text-xs font-semibold tracking-widest mt-14"
            style={{
              background: "rgba(255,107,26,0.08)",
              border: "1px solid rgba(255,107,26,0.3)",
              color: "#ff6b1a",
              boxShadow: "0 0 20px rgba(255,107,26,0.12)",
              letterSpacing: "3px",
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

        {/* Name */}
        <h1
          className="font-cinzel font-black mb-4 leading-none tracking-tight"
          style={{
            fontSize: "clamp(3rem, 10vw, 7.5rem)",
          }}
        >
          <span className="shimmer-gold">RAJ DUTTA</span>
        </h1>

        {/* Animated Trishul divider */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px flex-1 max-w-20" style={{ background: "linear-gradient(90deg, transparent, rgba(255,107,26,0.5))" }} />
          <div className="animate-trishul-glow" style={{ color: "#ff6b1a" }}>
            <TrishulIcon size={24} />
          </div>
          <div
            className="font-cinzel text-xs tracking-widest animate-text-glow-gold"
            style={{ color: "#f59e0b", letterSpacing: "4px" }}
          >
            HAR HAR MAHADEV
          </div>
          <div className="animate-trishul-glow" style={{ color: "#ff6b1a" }}>
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

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-14">
          <button
            onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            className="group relative px-8 py-3.5 rounded-full font-cinzel font-bold text-sm tracking-widest overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #ff6b1a, #ea580c)",
              color: "#ffffff",
              boxShadow: "0 0 30px rgba(255,107,26,0.4), 0 4px 20px rgba(0,0,0,0.4)",
              letterSpacing: "2.5px",
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
            className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-cinzel font-semibold text-sm tracking-widest transition-all duration-300 hover:scale-105"
            style={{
              background: "transparent",
              border: "1px solid rgba(139,92,246,0.5)",
              color: "#8b5cf6",
              boxShadow: "0 0 20px rgba(139,92,246,0.2)",
              letterSpacing: "2px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(139,92,246,0.9)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 30px rgba(139,92,246,0.4)";
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(139,92,246,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(139,92,246,0.5)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(139,92,246,0.2)";
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            }}
          >
            <FaGithub size={16} />
            GITHUB
          </a>

          <a
            href="https://www.linkedin.com/in/rajdutta062005/"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-cinzel font-semibold text-sm tracking-widest transition-all duration-300 hover:scale-105"
            style={{
              background: "transparent",
              border: "1px solid rgba(34,211,238,0.4)",
              color: "#22d3ee",
              boxShadow: "0 0 20px rgba(34,211,238,0.15)",
              letterSpacing: "2px",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(34,211,238,0.9)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 30px rgba(34,211,238,0.3)";
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(34,211,238,0.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(34,211,238,0.4)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(34,211,238,0.15)";
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
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
            className="group relative flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full font-cinzel font-bold text-sm tracking-widest overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer"
            style={{
              background: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(255,107,26,0.08))",
              border: "1px solid rgba(245,158,11,0.5)",
              color: "#f59e0b",
              boxShadow: "0 0 24px rgba(245,158,11,0.2), inset 0 0 20px rgba(245,158,11,0.04)",
              letterSpacing: "2px",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(245,158,11,0.9)";
              el.style.boxShadow = "0 0 40px rgba(245,158,11,0.45), 0 0 80px rgba(255,107,26,0.15), inset 0 0 30px rgba(245,158,11,0.08)";
              el.style.background = "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(255,107,26,0.12))";
              el.style.color = "#fcd34d";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(245,158,11,0.5)";
              el.style.boxShadow = "0 0 24px rgba(245,158,11,0.2), inset 0 0 20px rgba(245,158,11,0.04)";
              el.style.background = "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(255,107,26,0.08))";
              el.style.color = "#f59e0b";
            }}
          >
            {/* Subtle shimmer sweep on hover */}
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
        <div className="flex flex-col items-center gap-2 animate-float-y">
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
