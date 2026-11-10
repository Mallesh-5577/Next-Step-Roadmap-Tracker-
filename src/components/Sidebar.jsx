const navItems = [
  { id: "dashboard", icon: "⌂", label: "Overview" },
  { id: "explore", icon: "⌕", label: "Explore roadmaps" },
  { id: "my-roadmaps", icon: "▤", label: "My roadmaps" },
  { id: "planner", icon: "◷", label: "Daily planner" },
  { id: "quizzes", icon: "✓", label: "Knowledge quizzes" },
  { id: "analytics", icon: "▥", label: "Analytics" }
];

export default function Sidebar({ activePage, onNavigate, open, onClose, visitDates }) {
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = monthStart.getDay();
  const days = Array.from({ length: firstDay + monthDays }, (_, index) => {
    if (index < firstDay) return null;
    const day = index - firstDay + 1;
    const dateKey = `${today.getFullYear()}-${today.getMonth() + 1}-${day}`;
    const date = new Date(today.getFullYear(), today.getMonth(), day);
    const isFuture = date > new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return { day, dateKey, isFuture };
  });
  const monthName = today.toLocaleDateString("en-IN", { month: "short", year: "numeric" });

  return (
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <div className="brand">
        <div className="brand-mark">NS</div>
        <span>Next <span className="brand-light">Step</span></span>
        <button className="mobile-close" onClick={onClose} aria-label="Close menu">×</button>
      </div>

      <div className="sidebar-label">WORKSPACE</div>
      <nav className="nav-list">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activePage === item.id ? "active" : ""}`}
            onClick={() => { onNavigate(item.id); onClose(); }}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
            {item.id === "planner" && <span className="nav-dot" />}
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="attendance-card">
          <div className="attendance-heading">
            <strong>Attendance</strong>
            <span>{monthName}</span>
          </div>
          <div className="attendance-week">
            {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => <span key={`${day}-${index}`}>{day}</span>)}
          </div>
          <div className="attendance-grid">
            {days.map((item, index) => item
              ? <span key={item.dateKey} className={`attendance-day ${item.isFuture ? "future" : visitDates.includes(item.dateKey) ? "visited" : "missed"}`}>{item.day}</span>
              : <span key={`empty-${index}`} />)}
          </div>
          <div className="attendance-legend">
            <span><i className="visited" /> Visited</span>
            <span><i className="missed" /> Missed</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
