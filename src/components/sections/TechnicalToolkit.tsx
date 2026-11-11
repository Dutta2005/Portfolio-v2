import { ArrowDownRight } from "lucide-react";
import { featuredSkills } from "../../data/portfolio";
import SkillIcon from "../ui/SkillIcon";

export default function TechnicalToolkit() {
  return (
    <section className="sidebar-section toolkit-section" aria-labelledby="toolkit-title">
      <h2 id="toolkit-title">Technical toolkit</h2>
      <ul className="toolkit-list">
        {featuredSkills.map((skill) => <li key={skill}><SkillIcon name={skill} size={14} /><span>{skill}</span></li>)}
      </ul>
      <a className="text-link toolkit-more" href="#skills">View all technical skills<ArrowDownRight size={14} aria-hidden="true" /></a>
    </section>
  );
}
