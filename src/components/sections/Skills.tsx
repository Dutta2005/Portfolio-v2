import { skillCategories } from "../../data/portfolio";
import SkillIcon from "../ui/SkillIcon";

export default function Skills() {
  return (
    <section className="content-section technical-skills-section" id="skills" aria-labelledby="skills-title">
      <div className="skills-heading">
        <h2 id="skills-title">Technical skills</h2>
        <p>The languages, frameworks, and tools I use to build.</p>
      </div>
      <div className="technical-skill-groups">
        {Object.entries(skillCategories).map(([category, skills]) => (
          <div className="technical-skill-group" key={category}>
            <h3>{category}</h3>
            <ul>{skills.map((skill) => <li key={skill}><SkillIcon name={skill} /><span>{skill}</span></li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}
