import StatCard from "./StatCard";

export default function Dashboard({ user, enrolled, data, overallProgress, completedCount, totalMilestones, completedToday, onOpen, onNavigate, onToggleTask, quizzes }) {
  const displayName = user?.name?.trim() || "Learner";

  return <>
    <section className="welcome-banner"><div className="welcome-copy"><span className="welcome-kicker">MONDAY MOTIVATION · YOUR JOURNEY CONTINUES</span><h2>Keep showing up,<br /><em>{displayName}.</em></h2><p>Your future skills are built one focused session at a time.</p><button className="button button-light" onClick={() => onNavigate("my-roadmaps")}>Continue learning <span>→</span></button></div><div className="welcome-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="art-core">NS<span>✦</span></div><div className="floating-chip chip-one">+1 skill</div><div className="floating-chip chip-two">Keep going ↗</div></div><div className="banner-index">01 / 05</div></section>
    <section className="streak-strip"><div className="streak-icon" aria-hidden="true">🔥</div><div><span className="eyebrow">KEEP YOUR MOMENTUM</span><strong>{data.streak || 0} day streak</strong></div><div className="streak-status">{data.lastStreakDate === getDateKey() ? "Updated today" : "In progress"}</div></section>

    <div className="section-heading"><div><span className="eyebrow">YOUR PROGRESS</span><h2>Learning at a glance</h2></div><span className="muted-text">Updated just now</span></div>
    <section className="stats-grid"><StatCard icon="◎" label="Overall progress" value={`${overallProgress}%`} note={`${completedCount} milestones completed`} tone="violet" /><StatCard icon="▤" label="Active roadmaps" value={enrolled.length} note="Paths you're following" tone="blue" /><StatCard icon="✧" label="Milestones done" value={completedCount} note={`Out of ${totalMilestones} total`} tone="green" /></section>

    <div className="dashboard-columns">
      <section className="panel current-panel"><div className="panel-heading"><div><span className="eyebrow">PICK UP WHERE YOU LEFT</span><h2>Your learning paths</h2></div><button className="text-button" onClick={() => onNavigate("my-roadmaps")}>View all →</button></div>{enrolled.length ? <div className="compact-roadmaps">{enrolled.slice(0, 3).map(roadmap => { const done = roadmap.milestones.filter(m => data.completed.includes(m.id)).length; const percent = Math.round(done / roadmap.milestones.length * 100); return <button className="compact-roadmap" key={roadmap.id} onClick={() => onOpen(roadmap)}><div className={`roadmap-icon small ${roadmap.color}`}>{roadmap.icon}</div><div className="compact-info"><strong>{roadmap.title}</strong><span>{done} of {roadmap.milestones.length} milestones</span><div className="progress-line"><span style={{ width: `${percent}%` }} /></div></div><b>{percent}%</b><span className="arrow-muted">↗</span></button>; })}</div> : <EmptyState text="You haven't added a roadmap yet." action="Explore roadmaps" onClick={() => onNavigate("explore")} />}</section>
      <section className="panel daily-panel"><div className="panel-heading"><div><span className="eyebrow">MAKE TODAY COUNT</span><h2>Daily focus</h2></div><span className="date-pill">{new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</span></div><div className="daily-progress-wrap"><div className="daily-ring" style={{ "--progress": `${Math.min(100, completedToday / Math.max(1, data.tasks.length) * 100)}%` }}><div><strong>{completedToday}/{data.tasks.length}</strong><small>tasks done</small></div></div><div><strong>You're building momentum.</strong><p>Complete a few small tasks today.</p></div></div><div className="daily-task-list">{data.tasks.slice(0, 4).map(task => <label className={`daily-task ${task.done ? "task-done" : ""}`} key={task.id}><input type="checkbox" checked={task.done} onChange={() => onToggleTask(task.id)} /><span>{task.title}</span></label>)}</div><button className="text-button planner-link" onClick={() => onNavigate("planner")}>Open daily planner →</button></section>
    </div>
    <section className="panel dashboard-quiz-panel"><div className="panel-heading"><div><span className="eyebrow">PRACTICE YOUR SKILLS</span><h2>Knowledge quizzes</h2></div><button className="text-button" onClick={() => onNavigate("quizzes")}>View all →</button></div><div className="dashboard-quiz-grid">{quizzes.slice(0, 3).map(quiz => <button className="dashboard-quiz-card" key={quiz.id} onClick={() => onNavigate("quizzes")}><span className="quiz-icon">{quiz.icon}</span><span className="eyebrow">{quiz.category}</span><strong>{quiz.title}</strong><small>{quiz.questions.length} questions · {quiz.duration} min</small><span className="quiz-card-link">Start quiz →</span></button>)}</div></section>
  </>;
}

function getDateKey() {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function EmptyState({ text, action, onClick }) {
  return <div className="empty-box"><div className="empty-icon">✧</div><strong>{text}</strong><button className="button button-primary" onClick={onClick}>{action}</button></div>;
}
