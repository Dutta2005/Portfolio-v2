import { useRef, useEffect, useState } from "react";
import { personalInfo } from "../../data/portfolio";
import { ExternalLink } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";
import { MandalaRingIcon, TrishulIcon } from "../icons/ShivaIcons";

const CONTACT_LINKS = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: "rdhack247@gmail.com",
    href: "mailto:rdhack247@gmail.com",
    color: "#ff6b1a",
    glow: "rgba(255,107,26,0.3)",
  },
  {
    icon: FaPhone,
    label: "Phone",
    value: "+91 8918794465",
    href: "tel:+918918794465",
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.3)",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: "Dutta2005",
    href: "https://github.com/Dutta2005",
    color: "#e8e0f0",
    glow: "rgba(232,224,240,0.2)",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "rajdutta062005",
    href: "https://www.linkedin.com/in/rajdutta062005/",
    color: "#0ea5e9",
    glow: "rgba(14,165,233,0.3)",
  },
  {
    icon: FaTwitter,
    label: "X / Twitter",
    value: "@RajDutta2005",
    href: "https://x.com/RajDutta2005",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.3)",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    value: "raj_rd_001",
    href: "https://www.instagram.com/raj_rd_001/",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.3)",
  },
];

export default function Contact() {
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
    <section id="contact" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-radial-violet pointer-events-none" />

      {/* Mandala watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-4">
        <MandalaRingIcon size={600} className="text-violet animate-mandala-slow" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="font-cinzel text-xs mb-3 tracking-widest" style={{ color: "#8b5cf6", letterSpacing: "5px" }}>
            🔱 SACRED CONNECTION
          </p>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-4">
            <span style={{ color: "#e8e0f0" }}>Let's </span>
            <span className="shimmer-saffron">Connect</span>
          </h2>
          <p className="max-w-lg mx-auto" style={{ color: "rgba(232,224,240,0.5)", fontSize: "14px" }}>
            Like the sacred Ganga that welcomes all rivers — I am open to collaboration, mentorship,
            and building divine things together
          </p>
          <div className="divine-separator max-w-xs mx-auto mt-4" />
        </div>

        {/* Main contact card */}
        <div
          className={`neon-border p-8 md:p-12 rounded-2xl transition-all duration-700 delay-200 ${
            visible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{ backdropFilter: "blur(20px)" }}
        >
          {/* Inner content */}
          <div className="relative">
            {/* Top section */}
            <div className="text-center mb-10">
              <div className="flex justify-center mb-4 animate-glow-pulse" style={{ color: "#ff6b1a" }}>
                <TrishulIcon size={40} />
              </div>
              <h3 className="font-cinzel text-2xl font-bold mb-2 shimmer-gold">
                Raj Dutta
              </h3>
              <p className="font-cinzel text-xs tracking-widest" style={{ color: "rgba(139,92,246,0.8)", letterSpacing: "3px" }}>
                {personalInfo.divineTitle}
              </p>
            </div>

            {/* Contact links grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {CONTACT_LINKS.map(({ icon: Icon, label, value, href, color, glow }, i) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className={`group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                  }`}
                  style={{
                    transitionDelay: `${200 + i * 80}ms`,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = `${color}08`;
                    el.style.borderColor = `${color}35`;
                    el.style.boxShadow = `0 0 20px ${glow}`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "rgba(255,255,255,0.03)";
                    el.style.borderColor = "rgba(255,255,255,0.07)";
                    el.style.boxShadow = "none";
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      background: `${color}12`,
                      border: `1px solid ${color}25`,
                    }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-cinzel text-xs tracking-widest mb-1" style={{ color: "rgba(232,224,240,0.4)", letterSpacing: "1.5px" }}>
                      {label.toUpperCase()}
                    </p>
                    <p
                      className="text-sm font-medium truncate transition-colors duration-300 group-hover:text-white"
                      style={{ color: "rgba(232,224,240,0.75)" }}
                    >
                      {value}
                    </p>
                  </div>

                  {/* Arrow */}
                  <ExternalLink
                    size={14}
                    className="shrink-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
                    style={{ color }}
                  />
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="divine-separator my-8" />

            {/* Divine closing */}
            <div className="text-center">
              <p
                className="font-cinzel italic text-sm mb-4 animate-text-glow-gold"
                style={{ color: "rgba(245,158,11,0.8)", lineHeight: "1.8" }}
              >
                "Like Mahadev who is accessible to all who seek Him with pure intention,<br />
                I welcome every conversation, collaboration, and creative spark."
              </p>
              <div
                className="inline-flex items-center gap-2 font-cinzel text-xs tracking-widest"
                style={{ color: "rgba(255,107,26,0.6)", letterSpacing: "4px" }}
              >
                <span>🔱</span>
                <span>OM NAMAH SHIVAYA</span>
                <span>🔱</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
