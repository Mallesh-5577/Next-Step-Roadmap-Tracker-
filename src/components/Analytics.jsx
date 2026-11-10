import StatCard from "./StatCard";

function getDateKey(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function formatScreenTime(totalSeconds = 0) {
  const minutes = Math.floor(Math.max(0, totalSeconds) / 60);
  return minutes ? `${minutes}m` : "0m";
}

export default function Analytics({
  enrolled = [],
  completed = [],
  studyMinutes = 0,
  dailyScreenTime = {},
  liveSeconds = 0,
  sessionStartSeconds = 0,
  overallProgress = 0,
  totalMilestones = 0,
  completedCount = 0
}) {
  const remainingMilestones = Math.max(0, totalMilestones - completedCount);
  const today = new Date();
  const week = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    const key = getDateKey(date);
    const savedSeconds = Number(dailyScreenTime[key]) || 0;
    const currentSeconds = key === getDateKey(today) ? Math.max(savedSeconds, sessionStartSeconds + liveSeconds) : savedSeconds;
    return { label: date.toLocaleDateString("en-US", { weekday: "short" }), seconds: currentSeconds };
  });
  const maxSeconds = Math.max(...week.map(day => day.seconds), 60);
  const totalScreenTime = week.reduce((sum, day) => sum + day.seconds, 0);

  return (
    <section className="analytics-page">
      <section className="intro-row">
        <div><span className="eyebrow">PROGRESS, NOT PERFECTION</span><h2>Your effort, visualized.</h2><p>Understand your learning habits and keep improving.</p></div>
        <div className="analytics-score"><strong>{overallProgress}%</strong><span>overall progress</span></div>
      </section>
      <div className="stats-grid analytics-stats">
        <StatCard icon="✓" label="Completed milestones" value={completedCount} note={`Out of ${totalMilestones}`} tone="green" />
        <StatCard icon="▤" label="Active learning paths" value={enrolled.length} note="Roadmaps in progress" tone="violet" />
        <StatCard icon="✧" label="Milestones remaining" value={remainingMilestones} note="Your next opportunities" tone="orange" />
        <StatCard icon="◷" label="Screen time" value={formatScreenTime(totalScreenTime)} note="Total this week" tone="blue" />
      </div>
      <div className="analytics-grid">
        <section className="panel chart-panel">
          <div className="panel-heading"><div><span className="eyebrow">LEARNING ACTIVITY</span><h2>Weekly Progress</h2></div></div>
          <div className="bar-chart">{week.map(day => <div className="bar-column" key={day.label}><div className="bar-track"><span style={{ height: day.seconds ? `${Math.max(6, day.seconds / maxSeconds * 100)}%` : 0 }} /></div><small>{day.label}</small><em>{day.seconds ? formatScreenTime(day.seconds) : ""}</em></div>)}</div>
          <p className="chart-note">{totalScreenTime ? `You have spent ${formatScreenTime(totalScreenTime)} in the app this week.` : "Daily history will appear here as you use the app."}</p>
        </section>

      </div>
      <div className="export-row"><div><strong>Take your progress with you.</strong><p>Print this page or save it as a PDF.</p></div><button type="button" className="button button-outline" onClick={() => window.print()}>↗ Export progress as PDF</button></div>
    </section>
  );
}
