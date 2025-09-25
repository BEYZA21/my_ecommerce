import db from "../config/db.js";

export const getCategories = (req, res) => {
  const lang = req.query.lang || "tr";
  const q = `
    SELECT c.id, c.slug, t.name 
    FROM categories c
    JOIN category_translations t ON c.id = t.category_id
    WHERE t.lang_code = ?
  `;
  db.query(q, [lang], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
};
