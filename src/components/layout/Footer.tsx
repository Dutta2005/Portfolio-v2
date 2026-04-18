import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import { MandalaRingIcon } from "../icons/ShivaIcons";

const SOCIAL_LINKS = [
  { icon: FaGithub, href: "https://github.com/Dutta2005", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/rajdutta062005/", label: "LinkedIn" },
  { icon: FaTwitter, href: "https://x.com/RajDutta2005", label: "X / Twitter" },
  { icon: FaInstagram, href: "https://www.instagram.com/raj_rd_001/", label: "Instagram" },
  { icon: FaEnvelope, href: "mailto:rdhack247@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #050508 0%, #080810 100%)",
        borderTop: "1px solid rgba(255,107,26,0.12)",
      }}
    >
      {/* Top divine separator */}
      <div className="divine-separator" />

      {/* Background mandala watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <MandalaRingIcon size={400} className="text-saffron animate-mandala-slow" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 text-center">
        {/* Om symbol */}
        <div className="flex justify-center mb-6">
          <div className="animate-glow-pulse" style={{ color: "#f59e0b" }}>
            <MandalaRingIcon size={68} className="animate-mandala" />
          </div>
        </div>

        {/* Har Har Mahadev */}
        <h2
          className="font-cinzel-deco text-2xl md:text-3xl font-bold mb-2 shimmer-gold"
          style={{ letterSpacing: "6px" }}
        >
          HAR HAR MAHADEV
        </h2>

        <p
          className="font-cinzel text-xs tracking-widest mb-8"
          style={{ color: "rgba(255,107,26,0.6)", letterSpacing: "4px" }}
        >
          🔱 &nbsp;&nbsp; ॐ नमः शिवाय &nbsp;&nbsp; 🔱
        </p>

        {/* Quote */}
        <p
          className="max-w-lg mx-auto mb-10 leading-relaxed italic"
          style={{ color: "#6b7280", fontSize: "13px" }}
        >
          "Life is a divine algorithm, intricately coded by the universe, yet yours to rewrite and
          optimize."
        </p>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={label}
              className="group w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(255,107,26,0.5)";
                el.style.boxShadow = "0 0 14px rgba(255,107,26,0.3)";
                el.style.background = "rgba(255,107,26,0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(255,255,255,0.08)";
                el.style.boxShadow = "none";
                el.style.background = "rgba(255,255,255,0.04)";
              }}
            >
              <Icon size={16} style={{ color: "inherit", transition: "color 0.3s" }} className="text-gray-400 group-hover:text-orange-400" />
            </a>
          ))}
        </div>

        {/* Divider */}
        <div className="divine-separator mb-8" />

        {/* Bottom info */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-cinzel text-xs" style={{ color: "rgba(107,114,128,0.7)", letterSpacing: "1.5px" }}>
            Crafted with{" "}
            <span style={{ color: "#ff6b1a" }}>🔥</span>{" "}
            {"& devotion to Lord Mahadev"}
          </p>
          <p className="font-cinzel text-xs" style={{ color: "rgba(107,114,128,0.5)", letterSpacing: "1px" }}>
            © 2026 Raj Dutta · All Rights Reserved
          </p>
          <p className="font-cinzel text-xs" style={{ color: "rgba(139,92,246,0.5)", letterSpacing: "1px" }}>
            Built with React & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
