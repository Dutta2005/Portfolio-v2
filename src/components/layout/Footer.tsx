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
      {/* Sacred fire divider at top */}
      <div className="sacred-fire-divider" />

      {/* Background mandala watermark — 3D rotation */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 preserve-3d">
        <MandalaRingIcon size={400} className="text-saffron animate-mandala-3d" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 text-center">
        {/* Om symbol — 3D */}
        <div className="flex justify-center mb-6">
          <div
            className="preserve-3d"
            style={{
              color: "#f59e0b",
              animation: "glow-pulse 3s ease-in-out infinite, mandala-spin-3d 12s linear infinite",
            }}
          >
            <MandalaRingIcon size={68} />
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

        {/* Social Links — 3D hover float */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={label}
              className="group w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = "perspective(400px) translateZ(12px) scale(1.15)";
                el.style.borderColor = "rgba(255,107,26,0.5)";
                el.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3), 0 0 20px rgba(255,107,26,0.3)";
                el.style.background = "rgba(255,107,26,0.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = "perspective(400px) translateZ(0) scale(1)";
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
