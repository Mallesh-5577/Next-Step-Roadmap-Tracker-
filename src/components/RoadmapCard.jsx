export default function RoadmapCard({ roadmap, progress, enrolled, onOpen, onEnroll }) {
  const percent = progress || 0;
  return (
    <article className="roadmap-card">
      <div className="roadmap-card-top">
        <div className={`roadmap-icon ${roadmap.color}`}>{roadmap.icon}</div>
        <span className="level-tag">{roadmap.level}</span>
      </div>
      <div className="roadmap-card-content">
        <span className="eyebrow">{roadmap.category}</span>
        <h3>{roadmap.title}</h3>
        <p>{roadmap.description}</p>
        <div className="skill-tags">{roadmap.skills.slice(0, 4).map(skill => <span key={skill}>{skill}</span>)}</div>
      </div>
      <div className="roadmap-card-footer">
        <div className="card-meta"><span>◷ {roadmap.duration}</span><span>◇ {roadmap.milestones.length} milestones</span></div>
        {enrolled ? (
          <>
            <div className="progress-line"><span style={{ width: `${percent}%` }} /></div>
            <div className="progress-caption"><span>{percent}% complete</span><button onClick={() => onOpen(roadmap)}>Continue →</button></div>
          </>
        ) : <button className="button button-outline full-button" onClick={() => onEnroll(roadmap.id)}>＋ Add roadmap</button>}
      </div>
    </article>
  );
}
