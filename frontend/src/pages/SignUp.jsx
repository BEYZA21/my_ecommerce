// src/pages/SignUp.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp({ onSignin }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [err, setErr] = useState(null);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    const res = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) return setErr(data.error || "Bir hata oldu");
    // başarılıysa token ve username dönüyorsa localStorage'a kaydet
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("role", data.role || "user");
    if (onSignin) onSignin({ token: data.token, username: data.username, role: data.role });
    nav("/"); // ana sayfaya yönlendir
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Kayıt Ol</h2>
        {err && <div className="error">{err}</div>}
        <form onSubmit={handleSubmit}>
          <input value={form.username} onChange={e => setForm({...form, username: e.target.value})} placeholder="Kullanıcı adı" />
          <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="E-posta" />
          <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="Şifre" />
          <button className="btn">Kayıt Ol</button>
        </form>
      </div>
    </div>
  );
}
