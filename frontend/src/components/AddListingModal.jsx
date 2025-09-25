import { useState } from "react";
import "../styles/productForm.css";

export default function AddListingModal({ onClose }) {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("⚠️ Lütfen giriş yapın.");
      return;
    }

    const formData = new FormData(e.target);

    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "✅ Ürün admin onayına gönderildi.");
        e.target.reset(); // form temizle
      } else {
        setMessage(data.error || "❌ Bir hata oluştu.");
      }
    } catch (err) {
      setMessage("❌ Sunucuya ulaşılamıyor.");
    }
  };

  return (
    <div className="product-modal">
      <div className="product-modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Ürün Ekle</h2>

        <form className="product-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Ürün adı" required />
          <input type="number" name="price" placeholder="Fiyat (₺)" required />
          <textarea name="description" placeholder="Açıklama" required />

          <label className="upload-box">
            Görsel yükle
            <input type="file" name="image" hidden />
          </label>

          <button type="submit">Kaydet</button>
        </form>

        {message && <p className="form-message">{message}</p>}
      </div>
    </div>
  );
}
