import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn({ onsignin }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    try {
      const res = await fetch("http://localhost:5000/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        // Kullanıcıyı kaydet
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Parent state'e gönder
        onsignin({ token: data.token, user: data.user });

        // Rol kontrolü
        if (data.user.role === "admin") {
          navigate("/admin"); // admin paneline yönlendir
        } else {
          navigate("/"); // normal kullanıcı anasayfa
        }
      } else {
        setError(data.error || "Giriş başarısız");
      }
    } catch (err) {
      setError("Sunucuya bağlanılamadı");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Giriş Yap</h2>
        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Şifre" required />
          <button type="submit">Giriş Yap</button>
        </form>

        <p className="auth-alt">
          Hesabın yok mu? <Link to="/signup">Kayıt Ol</Link>
        </p>
      </div>
    </div>
  );
}
