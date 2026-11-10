export default function Introduction({ onLogin, onRegister }) {
  return (
    <main className="public-intro">
      <section className="intro-card">
        <div className="auth-brand"><span className="auth-brand-mark">N</span> Next <strong>Step</strong></div>
        <span className="eyebrow">YOUR LEARNING JOURNEY</span>
        <h1>Learn with focus.<br /><em>Grow with Next Step.</em></h1>
        <p>Build consistent learning habits, follow guided roadmaps, organize daily tasks, and track your progress in one simple workspace.</p>
        <div className="intro-features">
          <div><strong>◎</strong><span>Follow skill roadmaps</span></div>
          <div><strong>✓</strong><span>Plan your daily tasks</span></div>
          <div><strong>◷</strong><span>Track your learning time</span></div>
        </div>
        <div className="intro-actions">
          <button className="button button-primary" onClick={onLogin}>Login to continue</button>
          <button className="button button-outline" onClick={onRegister}>Create an account</button>
        </div>
      </section>
    </main>
  );
}
