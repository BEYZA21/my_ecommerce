import { useState, useEffect } from "react";
import "../styles/admin.css"; // admin css dosyan varsa import et

export default function AdminPanel() {
  const [pending, setPending] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // Bekleyen ürünleri çek
  useEffect(() => {
    fetch("http://localhost:5000/admin/pending-products", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPending(data.data); // sadece array
        } else {
          setMessage(data.error || "Bekleyen ürünler alınamadı.");
        }
      })
      .catch(() => setMessage("❌ Sunucuya ulaşılamıyor."))
      .finally(() => setLoading(false));
  }, [token]);

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/admin/approve/${id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMessage(data.message || "Hata oluştu.");
      if (res.ok) {
        setPending((prev) => prev.filter((p) => p.id !== id));
      }
    } catch {
      setMessage("❌ Sunucu hatası (onaylama başarısız).");
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/admin/reject/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMessage(data.message || "Hata oluştu.");
      if (res.ok) {
        setPending((prev) => prev.filter((p) => p.id !== id));
      }
    } catch {
      setMessage("❌ Sunucu hatası (reddetme başarısız).");
    }
  };

  return (
    <div className="admin-panel">
      <h2>📋 Admin Paneli – Bekleyen Ürünler</h2>
      {message && <p className="form-message">{message}</p>}

      {loading ? (
        <p>⏳ Yükleniyor...</p>
      ) : pending.length === 0 ? (
        <p>Bekleyen ürün yok.</p>
      ) : (
        <ul className="pending-list">
          {pending.map((p) => (
            <li key={p.id} className="pending-item">
              {p.image && (
                <img
                  src={`http://localhost:5000/uploads/${p.image}`}
                  alt={p.name}
                  width="80"
                />
              )}
              <div>
                <strong>{p.name}</strong> – {p.price}₺
                <p>{p.description}</p>
              </div>
              <div>
                <button onClick={() => handleApprove(p.id)}>✅ Onayla</button>
                <button onClick={() => handleReject(p.id)}>❌ Reddet</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
