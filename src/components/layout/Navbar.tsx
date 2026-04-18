import { useState, useEffect } from "react";
import { MandalaRingIcon } from "../icons/ShivaIcons";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(5,5,8,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,107,26,0.12)" : "none",
        boxShadow: scrolled ? "0 4px 40px rgba(255,107,26,0.05)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#hero")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex items-center gap-2.5 group"
        >
          <div
            className="relative w-9 h-9 flex items-center justify-center animate-glow-pulse"
            style={{ color: "#ff6b1a" }}
          >
            <MandalaRingIcon size={36} className="absolute inset-0 animate-mandala opacity-60" />
            <span style={{ fontFamily: "serif", fontSize: "18px", color: "#f59e0b" }}>ॐ</span>
          </div>
          <div>
            <span
              className="font-cinzel font-bold text-sm tracking-widest"
              style={{ color: "#e8e0f0", letterSpacing: "3px" }}
            >
              RAJ DUTTA
            </span>
            <div
              className="font-cinzel text-xs tracking-widest hidden sm:block"
              style={{ color: "#ff6b1a", fontSize: "9px", letterSpacing: "2px" }}
            >
              HAR HAR MAHADEV
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="relative px-3 py-1.5 font-cinzel text-xs tracking-widest group transition-colors duration-300 cursor-pointer"
              style={{
                color: activeSection === link.href ? "#ff6b1a" : "#9ca3af",
                letterSpacing: "2px",
              }}
            >
              <span className="relative z-10 group-hover:text-orange-400 transition-colors duration-300">
                {link.label}
              </span>
              {/* Underline glow */}
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-4/5 h-px transition-all duration-300"
                style={{
                  background: "linear-gradient(90deg, transparent, #ff6b1a, transparent)",
                }}
              />
            </button>
          ))}

          {/* CTA */}
          <a
            href="mailto:rdhack247@gmail.com"
            className="ml-4 px-4 py-1.5 rounded-full font-cinzel text-xs font-semibold tracking-widest transition-all duration-300 cursor-pointer hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #ff6b1a, #8b5cf6)",
              color: "#ffffff",
              letterSpacing: "1.5px",
              boxShadow: "0 0 20px rgba(255,107,26,0.3)",
              fontSize: "10px",
            }}
          >
            CONNECT
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: menuOpen
                  ? i === 1
                    ? "transparent"
                    : "#ff6b1a"
                  : "#e8e0f0",
                transform: menuOpen
                  ? i === 0
                    ? "rotate(45deg) translate(5px, 5px)"
                    : i === 2
                    ? "rotate(-45deg) translate(5px, -5px)"
                    : "none"
                  : "none",
                boxShadow: menuOpen ? "0 0 6px rgba(255,107,26,0.8)" : "none",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden overflow-hidden transition-all duration-500"
        style={{
          maxHeight: menuOpen ? "400px" : "0",
          background: "rgba(5,5,8,0.97)",
          borderBottom: menuOpen ? "1px solid rgba(255,107,26,0.15)" : "none",
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="py-3 text-left font-cinzel text-sm tracking-widest border-b cursor-pointer"
              style={{
                color: "#9ca3af",
                borderColor: "rgba(255,255,255,0.05)",
                letterSpacing: "2px",
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#ff6b1a")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#9ca3af")}
            >
              {link.label}
            </button>
          ))}
          <a
            href="mailto:rdhack247@gmail.com"
            className="mt-3 py-2.5 text-center rounded-full font-cinzel text-sm font-semibold tracking-widest"
            style={{
              background: "linear-gradient(135deg, #ff6b1a, #8b5cf6)",
              color: "#ffffff",
            }}
          >
            CONNECT
          </a>
        </div>
      </div>
    </nav>
  );
}
