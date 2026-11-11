import { ArrowUpRight, Mail } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";
import { personalInfo } from "../../data/portfolio";

export default function About() {
  return (
    <section className="sidebar-section" id="about" aria-labelledby="about-title">
      <h2 id="about-title">A little about me</h2>
      <p>I’m Raj, a developer working at the intersection of AI and the web. I enjoy turning ideas into useful products, from agent workflows to the interfaces people use every day.</p>
      <p>Outside product work, I contribute to open source and mentor other developers.</p>
      <div className="profile-links">
        <a href={"mailto:" + personalInfo.email}><Mail size={15} aria-hidden="true" />Email me<ArrowUpRight size={14} aria-hidden="true" /></a>
        <a href={personalInfo.github} target="_blank" rel="noreferrer"><Github size={15} aria-hidden="true" />GitHub<ArrowUpRight size={14} aria-hidden="true" /></a>
        <a href={personalInfo.linkedin} target="_blank" rel="noreferrer"><Linkedin size={15} aria-hidden="true" />LinkedIn<ArrowUpRight size={14} aria-hidden="true" /></a>
      </div>
    </section>
  );
}
