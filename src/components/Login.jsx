import { useState } from "react";

export default function Login({ initialEmail = "", onLogin, onShowRegister }) {
  const [form, setForm] = useState({ email: initialEmail, password: "" });
  const [error, setError] = useState("");

  function updateField(event) {
    setForm(previous => ({ ...previous, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (!form.email.trim() || !form.password) {
      setError("Enter your email and password.");
      return;
    }
    onLogin({ email: form.email.trim().toLowerCase(), password: form.password }, setError);
  }

  return (
    <section className="auth-card">
      <div className="auth-brand"><span className="auth-brand-mark">N</span> Next <strong>Step</strong></div>
      <span className="eyebrow">WELCOME BACK</span>
      <h1>Log in to Next Step</h1>
      <p className="auth-subtitle">Continue your learning journey.</p>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Email<input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" /></label>
        <label>Password<input name="password" type="password" value={form.password} onChange={updateField} autoComplete="current-password" /></label>
        {error && <p className="auth-error" role="alert">{error}</p>}
        <button className="button button-primary auth-submit" type="submit">Login</button>
      </form>
      <p className="auth-switch">Need an account? <button type="button" onClick={onShowRegister}>Register</button></p>
    </section>
  );
}
