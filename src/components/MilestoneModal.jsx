import { useState } from "react";

export default function MilestoneModal({ roadmap, completed, onToggle, onClose }) {
  const [expanded, setExpanded] = useState(null);
  if (!roadmap) return null;
  const doneCount = roadmap.milestones.filter(m => completed.includes(m.id)).length;
  const percent = Math.round((doneCount / roadmap.milestones.length) * 100);

  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <section className="roadmap-modal">
        <div className="modal-heading">
          <div><span className="eyebrow">{roadmap.category} · {roadmap.duration}</span><h2>{roadmap.title}</h2><p>{roadmap.description}</p></div>
          <button className="icon-button" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="modal-progress">
          <div className="progress-caption"><strong>Your roadmap progress</strong><strong>{percent}%</strong></div>
          <div className="progress-line large"><span style={{ width: `${percent}%` }} /></div>
          <small>{doneCount} of {roadmap.milestones.length} milestones completed</small>
        </div>
        <div className="milestone-list">
          {roadmap.milestones.map((milestone, index) => {
            const isDone = completed.includes(milestone.id);
            const isOpen = expanded === milestone.id;
            return (
              <article className={`milestone ${isDone ? "milestone-done" : ""}`} key={milestone.id}>
                <button className="milestone-main" onClick={() => setExpanded(isOpen ? null : milestone.id)}>
                  <span className="milestone-number">{isDone ? "✓" : String(index + 1).padStart(2, "0")}</span>
                  <span className="milestone-title"><strong>{milestone.title}</strong><small>{milestone.week}</small></span>
                  <span className="milestone-chevron">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="milestone-details">
                    <p>{milestone.description}</p>
                    <div className="task-checklist">
                      {milestone.tasks.map(task => <div className="mini-task" key={task}><span>•</span>{task}</div>)}
                    </div>
                    <button className={`button ${isDone ? "button-soft" : "button-primary"}`} onClick={() => onToggle(milestone.id)}>
                      {isDone ? "Mark as incomplete" : "Mark milestone complete"}
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
