import express from "express";
import { authenticate } from "../utils/middleware.js";

const router = express.Router();

// Bekleyen ürünler
router.get("/pending-products", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, error: "Yetkisiz erişim" });
    }
    const [rows] = await req.db.query("SELECT * FROM pending_products");
    res.json({ success: true, data: rows }); // ✅ data: rows
  } catch (err) {
    console.error("DB Hatası:", err);
    res.status(500).json({ success: false, error: "Veritabanı hatası" });
  }
});


// Onaylı ürünler
router.get("/products", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, error: "Yetkisiz erişim" });
    }
    const [rows] = await req.db.query("SELECT * FROM products");
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error("DB Hatası:", err);
    res.status(500).json({ success: false, error: "Veritabanı hatası" });
  }
});

// Onayla
router.post("/approve/:id", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, error: "Yetkisiz erişim" });
    }

    const [rows] = await req.db.query("SELECT * FROM pending_products WHERE id=?", [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: "Ürün bulunamadı" });
    }

    const p = rows[0];
    await req.db.query(
      "INSERT INTO products (name, price, description, image, user_id) VALUES (?,?,?,?,?)",
      [p.name, p.price, p.description, p.image, p.user_id]
    );
    await req.db.query("DELETE FROM pending_products WHERE id=?", [req.params.id]);

    res.json({ success: true, message: "✅ Ürün onaylandı" });
  } catch (err) {
    console.error("DB Hatası:", err);
    res.status(500).json({ success: false, error: "Veritabanı hatası" });
  }
});

// Reddet
router.delete("/reject/:id", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, error: "Yetkisiz erişim" });
    }
    await req.db.query("DELETE FROM pending_products WHERE id=?", [req.params.id]);
    res.json({ success: true, message: "❌ Ürün reddedildi" });
  } catch (err) {
    console.error("DB Hatası:", err);
    res.status(500).json({ success: false, error: "Veritabanı hatası" });
  }
});

export default router;
