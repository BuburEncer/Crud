const express = require("express");
const router = express.Router();
const db = require("../db");

// Rute untuk mendapatkan semua produk
router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { name, description, price, product_condition, status, seller_id } = req.body;

  // Cek apakah 'name' ada
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  const query = "INSERT INTO products (name, description, price, product_condition, status, seller_id) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(query, [name, description, price, product_condition, status, seller_id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ id: result.insertId, name, description, price, product_condition, status, seller_id });
  });
});

// Rute untuk mendapatkan produk berdasarkan ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM products WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Product not found" });
    res.json(results[0]);
  });
});

// Rute untuk memperbarui produk
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, description, price, product_condition, status } = req.body;
  const query = "UPDATE products SET name = ?, description = ?, price = ?, product_condition = ?, status = ? WHERE id = ?";
  db.query(query, [name, description, price, product_condition, status, id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated successfully" });
  });
});

// Rute untuk menghapus produk
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  });
});

module.exports = router;

// Create a Product
router.post("/", (req, res) => {
  const { name, description, price, condition } = req.body;
  const query = "INSERT INTO products (name, description, price, condition) VALUES (?, ?, ?, ?)";
  db.query(query, [name, description, price, condition], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ id: result.insertId, name, description, price, condition });
  });
});

// Read All Products
router.get("/", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

// Read Single Product
router.get("/:id", (req, res) => {
  const query = "SELECT * FROM products WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Product not found" });
    res.json(results[0]);
  });
});

// Update a Product
router.put("/:id", (req, res) => {
  const { name, description, price, condition, status } = req.body;
  const query = "UPDATE products SET name = ?, description = ?, price = ?, condition = ?, status = ? WHERE id = ?";
  db.query(query, [name, description, price, condition, status, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated successfully" });
  });
});

// Delete a Product
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  });
});

module.exports = router;
