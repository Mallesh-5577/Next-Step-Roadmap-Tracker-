import { useState } from "react";

export default function Register({ onRegister, onShowLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");

  function updateField(event) {
    setForm(previous => ({ ...previous, [event.target.name]: event.target.value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.password || !form.confirmPassword) {
      setError("Please complete all fields.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    onRegister({
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password
    }, setError);
  }

  return (
    <section className="auth-card">
      <div className="auth-brand"><span className="auth-brand-mark">N</span> Next <strong>Step</strong></div>
      <span className="eyebrow">GET STARTED</span>
      <h1>Create your account</h1>
      <p className="auth-subtitle">Create an account to save your learning progress.</p>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>Full name<input name="name" value={form.name} onChange={updateField} autoComplete="name" /></label>
        <label>Email<input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" /></label>
        <label>Password<input name="password" type="password" value={form.password} onChange={updateField} autoComplete="new-password" /></label>
        <label>Confirm password<input name="confirmPassword" type="password" value={form.confirmPassword} onChange={updateField} autoComplete="new-password" /></label>
        {error && <p className="auth-error" role="alert">{error}</p>}
        <button className="button button-primary auth-submit" type="submit">Register</button>
      </form>
      <p className="auth-switch">Already have an account? <button type="button" onClick={onShowLogin}>Login</button></p>
    </section>
  );
}
