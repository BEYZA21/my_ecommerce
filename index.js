// // index.js
// const express = require('express');
// const mysql = require('mysql2/promise');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());

// const PORT = process.env.PORT || 5000;

// // MySQL Pool - ayarları kendi sistemine göre güncelle
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '',        // senin şifre (XAMPP ise genelde boş)
//   database: 'my_ecommerce', // oluşturduğun DB adı
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });
// const cors = require("cors");
// app.use(cors());

// async function query(sql, params=[]) {
//   const [rows] = await pool.execute(sql, params);
//   return rows;
// }

// /* ---------- CATEGORY ENDPOINTS ---------- */
// // GET /categories
// app.get('/categories', async (req, res) => {
//   try {
//     const rows = await query('SELECT id, name, path, slug FROM categories ORDER BY id');
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'DB error' });
//   }
// });

// // GET /categories/:id (opsiyonel - alt zincir gösterimi)
// app.get('/categories/:id', async (req, res) => {
//   try {
//     const id = parseInt(req.params.id,10);
//     const rows = await query('SELECT id, name, path, slug FROM categories WHERE id = ?', [id]);
//     if (!rows.length) return res.status(404).json({ error: 'Category not found' });
//     res.json(rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'DB error' });
//   }
// });

// /* ---------- PRODUCTS ENDPOINTS ---------- */
// // Helper: build product object with category info
// async function fetchProducts({ page=1, perPage=20, categoryId=null } = {}) {
//   const offset = (page - 1) * perPage;
//   let sql = `
//     SELECT p.id, p.name, p.description, p.price, p.stock, p.store_id,
//            c.id AS category_id, c.name AS category_name, c.slug AS category_slug
//     FROM products p
//     LEFT JOIN product_categories pc ON p.id = pc.product_id
//     LEFT JOIN categories c ON pc.category_id = c.id
//   `;
//   const params = [];
//   if (categoryId) {
//     sql += ' WHERE c.id = ?';
//     params.push(categoryId);
//   }
//   sql += ' GROUP BY p.id ORDER BY p.id DESC LIMIT ? OFFSET ?';
//   params.push(perPage, offset);
//   const rows = await query(sql, params);
//   // map to expected structure
//   return rows.map(r => ({
//     id: r.id,
//     name: r.name,
//     description: r.description,
//     price: Number(r.price),
//     stock: r.stock,
//     store_id: r.store_id,
//     category: r.category_id ? { id: r.category_id, name: r.category_name, slug: r.category_slug } : null
//   }));
// }

// // GET /products?category=1&page=1&perPage=20
// app.get('/products', async (req, res) => {
//   try {
//     const category = req.query.category ? parseInt(req.query.category,10) : null;
//     const page = req.query.page ? parseInt(req.query.page,10) : 1;
//     const perPage = req.query.perPage ? parseInt(req.query.perPage,10) : 20;
//     const items = await fetchProducts({ page, perPage, categoryId: category });
//     res.json({ page, perPage, items });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'DB error' });
//   }
// });

// // GET /products/:id
// app.get('/products/:id', async (req, res) => {
//   try {
//     const id = parseInt(req.params.id,10);
//     const rows = await query(`
//       SELECT p.*, c.id AS category_id, c.name AS category_name, c.slug AS category_slug
//       FROM products p
//       LEFT JOIN product_categories pc ON p.id = pc.product_id
//       LEFT JOIN categories c ON pc.category_id = c.id
//       WHERE p.id = ?
//       LIMIT 1
//     `, [id]);
//     if (!rows.length) return res.status(404).json({ error: 'Product not found' });
//     const r = rows[0];
//     res.json({
//       id: r.id,
//       name: r.name,
//       description: r.description,
//       price: Number(r.price),
//       stock: r.stock,
//       store_id: r.store_id,
//       category: r.category_id ? { id: r.category_id, name: r.category_name, slug: r.category_slug } : null
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'DB error' });
//   }
// });

// // POST /products
// app.post('/products', async (req, res) => {
//   try {
//     const { name, description, price, stock=0, store_id=null, category_id=null } = req.body;
//     if (!name || price == null) return res.status(400).json({ error: 'name and price required' });

//     const result = await query(
//       'INSERT INTO products (name, description, price, stock, store_id) VALUES (?, ?, ?, ?, ?)',
//       [name, description, price, stock, store_id]
//     );
//     const insertedId = result.insertId || result.insertedId || result.ID;
//     if (category_id) {
//       await query('INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)', [insertedId, category_id]);
//     }
//     const product = await query('SELECT * FROM products WHERE id = ?', [insertedId]);
//     res.status(201).json({ id: insertedId, product: product[0] });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'DB error' });
//   }
// });

// // PATCH /products/:id
// app.patch('/products/:id', async (req, res) => {
//   try {
//     const id = parseInt(req.params.id,10);
//     const fields = [];
//     const params = [];
//     ['name','description','price','stock','store_id'].forEach(k => {
//       if (req.body[k] !== undefined) {
//         fields.push(`${k} = ?`);
//         params.push(req.body[k]);
//       }
//     });
//     if (!fields.length) return res.status(400).json({ error: 'no fields to update' });
//     params.push(id);
//     await query(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, params);

//     // optional category update: replace relations
//     if (req.body.category_id !== undefined) {
//       await query('DELETE FROM product_categories WHERE product_id = ?', [id]);
//       if (req.body.category_id) {
//         await query('INSERT INTO product_categories (product_id, category_id) VALUES (?, ?)', [id, req.body.category_id]);
//       }
//     }

//     const updated = await query('SELECT * FROM products WHERE id = ?', [id]);
//     res.json({ product: updated[0] });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'DB error' });
//   }
// });

// // DELETE /products/:id
// app.delete('/products/:id', async (req, res) => {
//   try {
//     const id = parseInt(req.params.id,10);
//     await query('DELETE FROM product_categories WHERE product_id = ?', [id]);
//     res.json({ deleted: true });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'DB error' });
//   }
// });

// /* ---------- START SERVER ---------- */
// app.listen(PORT, () => {
//   console.log(`Server listening on http://localhost:${PORT}`);
// });
