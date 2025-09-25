import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// ✅ Onaylı ürünleri listele
router.get("/", async (req, res) => {
  try {
    const [rows] = await req.db.query("SELECT * FROM products");
    res.json(rows); // frontend doğrudan array alır
  } catch (err) {
    console.error("DB hatası:", err);
    res.status(500).json({ error: "Veritabanı hatası." });
  }
});

// ✅ Ürün ekleme (pending_products'a düşer)
router.post("/", upload.single("image"), async (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !price || !description) {
    return res.status(400).json({ error: "Tüm alanlar zorunludur." });
  }

  try {
    await req.db.query(
      "INSERT INTO pending_products (name, price, description, image) VALUES (?, ?, ?, ?)",
      [name, price, description, image]
    );
    res.json({ message: "✅ Ürün admin onayına gönderildi." });
  } catch (err) {
    console.error("DB hatası:", err);
    res.status(500).json({ error: "Veritabanı hatası." });
  }
});

export default router;
