import { experiences } from "../../data/portfolio";

export default function Experience() {
  return (
    <section className="content-section experience-section" id="experience" aria-labelledby="experience-title">
      <div className="section-heading">
        <h2 id="experience-title">Experience</h2>
        <span>Where I’ve contributed</span>
      </div>
      <div className="experience-timeline">
        {experiences.map((experience) => (
          <article className={"experience-entry" + (experience.current ? " is-current" : "")} key={experience.company}>
            <div className="entry-heading">
              <h3>{experience.company}</h3>
              <p className="entry-period">{experience.current && <span className="current-label">Current</span>}{experience.period}</p>
            </div>
            <p className="entry-role">{experience.role}</p>
            <ul>{experience.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            <p className="entry-category">{experience.category}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
