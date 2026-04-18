import { useRef, useEffect, useState } from "react";
import { personalInfo } from "../../data/portfolio";
import { MandalaRingIcon, TrishulIcon } from "../icons/ShivaIcons";
import { Zap, Code2, Brain, Globe } from "lucide-react";

const FOCUS_ICONS = [Zap, Code2, Brain, Globe];
const FOCUS_COLORS = ["#ff6b1a", "#8b5cf6", "#22d3ee", "#f59e0b"];

export default function About() {
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
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-radial-saffron pointer-events-none" />

      {/* Om watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none opacity-5">
        <MandalaRingIcon size={500} className="text-saffron animate-mandala-slow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p
            className="font-cinzel text-xs mb-3 tracking-widest"
            style={{ color: "#ff6b1a", letterSpacing: "5px" }}
          >
            🔱 THE SEEKER
          </p>
          <h2
            className="font-cinzel text-4xl md:text-5xl font-bold shimmer-gold mb-4"
          >
            About Me
          </h2>
          <div className="divine-separator max-w-xs mx-auto" />
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — Avatar + divine frame */}
          <div
            className={`flex justify-center transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
            }`}
          >
            <div className="relative">
              {/* Outer rotating ring */}
              <div
                className="absolute inset-0 -m-6 animate-mandala"
                style={{ color: "rgba(255,107,26,0.25)" }}
              >
                <MandalaRingIcon size={380} />
              </div>

              {/* Inner rotating ring */}
              <div
                className="absolute inset-0 -m-2 animate-mandala-reverse"
                style={{ color: "rgba(139,92,246,0.2)" }}
              >
                <MandalaRingIcon size={330} />
              </div>

              {/* Avatar card */}
              <div
                className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden animate-float-y"
                style={{
                  border: "3px solid rgba(255,107,26,0.4)",
                  boxShadow:
                    "0 0 40px rgba(255,107,26,0.2), 0 0 80px rgba(139,92,246,0.1), inset 0 0 30px rgba(0,0,0,0.5)",
                }}
              >
                {/* Divine avatar placeholder with Shiva aesthetic */}
                <div
                  className="w-full h-full flex flex-col items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(circle at 40% 30%, rgba(255,107,26,0.15), rgba(139,92,246,0.1), rgba(5,5,8,0.95))",
                  }}
                >
                  <div
                    className="text-8xl mb-2 animate-glow-pulse"
                    style={{ filter: "drop-shadow(0 0 20px rgba(245,158,11,0.6))" }}
                  >
                    ॐ
                  </div>
                  <p
                    className="font-cinzel text-xs tracking-widest"
                    style={{ color: "rgba(245,158,11,0.6)", letterSpacing: "3px" }}
                  >
                    RAJ DUTTA
                  </p>
                </div>
              </div>

              {/* Corner trishul badges */}
              {[
                { top: "-10px", right: "-10px", color: "#ff6b1a" },
                { bottom: "-10px", left: "-10px", color: "#8b5cf6" },
              ].map((pos, i) => (
                <div
                  key={i}
                  className="absolute w-8 h-8 rounded-full flex items-center justify-center animate-glow-pulse"
                  style={{
                    ...pos,
                    background: "rgba(5,5,8,0.9)",
                    border: `2px solid ${pos.color}`,
                    color: pos.color,
                    boxShadow: `0 0 12px ${pos.color}60`,
                  }}
                >
                  <TrishulIcon size={16} />
                </div>
              ))}
            </div>
          </div>

          {/* Right — Text content */}
          <div
            className={`transition-all duration-700 delay-300 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            {/* Divine quote */}
            <div
              className="p-5 rounded-2xl mb-8"
              style={{
                background: "rgba(255,107,26,0.04)",
                border: "1px solid rgba(255,107,26,0.15)",
                borderLeft: "3px solid #ff6b1a",
              }}
            >
              <p
                className="italic leading-relaxed text-base"
                style={{ color: "rgba(232,224,240,0.8)" }}
              >
                "{personalInfo.summary}"
              </p>
            </div>

            {/* Professional summary */}
            <p
              className="leading-relaxed mb-8"
              style={{ color: "rgba(232,224,240,0.65)", lineHeight: "1.9" }}
            >
              I am a{" "}
              <span style={{ color: "#ff6b1a", fontWeight: 600 }}>
                Full Stack Developer & AI Engineer
              </span>{" "}
              focused on building scalable web platforms, developer-first tools, and SaaS products.
              My core strength is combining modern web engineering with practical AI systems —
              especially across the{" "}
              <span style={{ color: "#8b5cf6" }}>Next.js ecosystem</span>,{" "}
              <span style={{ color: "#22d3ee" }}>LLM integrations</span>, RAG pipelines, and
              agentic workflows.
            </p>

            {/* Current focus */}
            <div>
              <h3
                className="font-cinzel text-xs font-bold tracking-widest mb-4"
                style={{ color: "#f59e0b", letterSpacing: "4px" }}
              >
                🔱 CURRENT DIVINE FOCUS
              </h3>

              <div className="grid sm:grid-cols-2 gap-3">
                {personalInfo.currentFocus.map((focus, i) => {
                  const Icon = FOCUS_ICONS[i % FOCUS_ICONS.length];
                  const color = FOCUS_COLORS[i % FOCUS_COLORS.length];
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-102 group cursor-default"
                      style={{
                        background: `${color}08`,
                        border: `1px solid ${color}20`,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = `${color}50`;
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 16px ${color}20`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = `${color}20`;
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                      }}
                    >
                      <div className="mt-0.5 shrink-0" style={{ color }}>
                        <Icon size={14} />
                      </div>
                      <p style={{ color: "rgba(232,224,240,0.7)", fontSize: "13px", lineHeight: "1.5" }}>
                        {focus}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Personal quote scroll */}
            <div
              className="mt-8 p-4 rounded-xl text-center"
              style={{
                background: "rgba(245,158,11,0.04)",
                border: "1px solid rgba(245,158,11,0.15)",
              }}
            >
              <p className="font-cinzel text-xs italic animate-text-glow-gold" style={{ color: "#f59e0b", letterSpacing: "1px" }}>
                "{personalInfo.quote}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
