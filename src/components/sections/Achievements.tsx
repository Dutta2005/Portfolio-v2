import { achievements } from "../../data/portfolio";

export default function Achievements() {
  return (
    <section className="content-section recognition-section" id="achievements" aria-labelledby="recognition-title">
      <div className="section-heading"><h2 id="recognition-title">Recognition</h2></div>
      {achievements.map((achievement) => (
        <div className="recognition-row" key={achievement.title}>
          <div><h3>{achievement.title}</h3><p>{achievement.result}</p></div>
          <span>{achievement.date}</span>
        </div>
      ))}
    </section>
  );
}
