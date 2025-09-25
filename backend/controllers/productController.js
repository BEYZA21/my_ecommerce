import db from "../config/db.js";

export const getProducts = (req, res) => {
  const lang = req.query.lang || "tr";
  const q = `
    SELECT p.id, p.slug, p.price, p.city, p.stock, p.rating, p.image,
           t.title, t.description
    FROM products p
    JOIN product_translations t ON p.id = t.product_id
    WHERE t.lang_code = ?
  `;
  db.query(q, [lang], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
};
