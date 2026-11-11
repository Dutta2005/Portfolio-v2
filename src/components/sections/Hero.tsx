import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { personalInfo } from "../../data/portfolio";
import portrait from "../../../screenshots/raj.jpeg";
import SocialLinks from "../ui/SocialLinks";

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-main">
        <p className="hero-role">{personalInfo.title}</p>
        <h1 id="hero-title">Raj Dutta<span>.</span></h1>
        <p className="hero-summary">{personalInfo.summary}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects">
            Explore my work <ArrowDown size={16} aria-hidden="true" />
          </a>
          <a className="button button-secondary" href={import.meta.env.VITE_RESUME_URL} target="_blank" rel="noreferrer">
            <FileText size={16} aria-hidden="true" /> Resume
          </a>
        </div>
        <SocialLinks label="Hero social links" />
      </div>
      <div className="hero-profile">
        <figure className="portrait-frame">
          <img src={portrait} alt="Raj Dutta" width={400} height={400} fetchPriority="high" decoding="async" />
        </figure>
        <div className="current-role">
          <p className="small-heading"><span className="status-dot" />Currently at</p>
          <a href="#experience" className="current-company">InterviewSurge <ArrowUpRight size={15} aria-hidden="true" /></a>
          <p>AI Engineer Intern</p>
        </div>
      </div>
    </section>
  );
}
