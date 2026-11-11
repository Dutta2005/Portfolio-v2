import { useEffect, useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, CodeXml, FolderCode, House, Mail } from "lucide-react";
import { personalInfo } from "../../data/portfolio";
import Logo from "../ui/Logo";
import ThemeToggle from "../ui/ThemeToggle";

const links = [
  { id: "top", label: "Home", shortLabel: "Home", icon: House },
  { id: "experience", label: "Experience", shortLabel: "Work", icon: BriefcaseBusiness },
  { id: "projects", label: "Projects", shortLabel: "Projects", icon: FolderCode },
  { id: "skills", label: "Skills", shortLabel: "Skills", icon: CodeXml },
  { id: "contact", label: "Contact", shortLabel: "Contact", icon: Mail },
];

export default function Navbar() {
  const [active, setActive] = useState("top");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = window.innerWidth <= 700 ? 100 : 130;
      let current = "top";
      for (const { id } of links) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= offset) current = id;
      }
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) current = "contact";
      setActive(current);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="wordmark" href="#top" aria-label="Raj Dutta, back to top">
          <Logo />
        </a>
        <nav className="primary-navigation" aria-label="Main navigation">
          {links.map(({ id, label, shortLabel, icon: Icon }) => (
            <a key={id} href={"#" + id} aria-label={label}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setActive(id)}>
              <Icon className="nav-icon" size={18} aria-hidden="true" />
              <span className="nav-label">{label}</span><span className="nav-short-label">{shortLabel}</span>
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <a className="header-email" href={"mailto:" + personalInfo.email}>
            <Mail className="header-mail-icon" size={16} aria-hidden="true" />
            Let’s talk <ArrowUpRight className="header-email-arrow" size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}
