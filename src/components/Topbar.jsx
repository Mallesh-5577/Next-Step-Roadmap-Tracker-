export default function Topbar({ title, subtitle, darkMode, onToggleTheme, onMenu, user, onLogin, onRegister, onLogout }) {
  return (
    <header className="topbar">
      <div className="topbar-heading">
        <button className="mobile-menu" onClick={onMenu} aria-label="Open menu">☰</button>
        <div><h1>{title}</h1><p>{subtitle}</p></div>
      </div>
      <div className="topbar-actions">
        <span className="today-label">{new Date().toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" })}</span>
        <button className="icon-button" onClick={onToggleTheme} title="Toggle theme" aria-label="Toggle theme">{darkMode ? "☀" : "☾"}</button>
        {user ? <><span className="topbar-user">{user.name}</span><button className="auth-topbar-button" onClick={onLogout}>Log out</button></> : <><button className="auth-topbar-button" onClick={onLogin}>Login</button><button className="auth-topbar-button auth-topbar-primary" onClick={onRegister}>Register</button></>}
      </div>
    </header>
  );
}
