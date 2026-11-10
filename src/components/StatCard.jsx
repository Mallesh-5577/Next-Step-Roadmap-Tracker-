export default function StatCard({ icon, label, value, note, tone }) {
  return (
    <article className="stat-card">
      <div className={`stat-icon ${tone}`}>{icon}</div>
      <div className="stat-copy"><span>{label}</span><strong>{value}</strong><small>{note}</small></div>
    </article>
  );
}
