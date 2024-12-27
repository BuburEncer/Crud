const db = require("../db");

// Fungsi untuk membuat produk baru
const createProduct = (product, callback) => {
  const { name, description, price, condition, status, seller_id } = product;
  const query = "INSERT INTO products (name, description, price, condition, status, seller_id) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(query, [name, description, price, condition, status || "Available", seller_id], callback);
};

// Fungsi untuk mendapatkan semua produk
const getAllProducts = (callback) => {
  const query = "SELECT * FROM products";
  db.query(query, callback);
};

// Fungsi untuk mendapatkan produk berdasarkan ID
const getProductById = (id, callback) => {
  const query = "SELECT * FROM products WHERE id = ?";
  db.query(query, [id], callback);
};

// Fungsi untuk memperbarui produk
const updateProduct = (id, product, callback) => {
  const { name, description, price, condition, status } = product;
  const query = "UPDATE products SET name = ?, description = ?, price = ?, condition = ?, status = ? WHERE id = ?";
  db.query(query, [name, description, price, condition, status, id], callback);
};

// Fungsi untuk menghapus produk
const deleteProduct = (id, callback) => {
  const query = "DELETE FROM products WHERE id = ?";
  db.query(query, [id], callback);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
