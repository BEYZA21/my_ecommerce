import { useState } from "react";

export default function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Lütfen giriş yapın.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Ürün admin onayına gönderildi.");
        setName("");
        setPrice("");
        setDescription("");
        setImage(null);
      } else {
        setMessage(data.error || "Bir hata oluştu.");
      }
    } catch (err) {
      setMessage("Sunucuya ulaşılamıyor.");
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Ürün Ekle</h2>
      {message && <p className="form-message">{message}</p>}

      <input
        type="text"
        placeholder="Ürün Adı"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Fiyat"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <textarea
        placeholder="Açıklama"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <button type="submit">Ekle</button>
    </form>
  );
}
