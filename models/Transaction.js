const db = require("../db");

// Fungsi untuk membuat transaksi baru
const createTransaction = (transaction, callback) => {
  const { product_id, buyer_id } = transaction;
  const query = "INSERT INTO transactions (product_id, buyer_id) VALUES (?, ?)";
  db.query(query, [product_id, buyer_id], callback);
};

// Fungsi untuk mendapatkan semua transaksi
const getAllTransactions = (callback) => {
  const query = `
    SELECT t.id, t.transaction_date, p.name AS product_name, u.name AS buyer_name
    FROM transactions t
    JOIN products p ON t.product_id = p.id
    JOIN users u ON t.buyer_id = u.id
  `;
  db.query(query, callback);
};

// Fungsi untuk mendapatkan transaksi berdasarkan ID
const getTransactionById = (id, callback) => {
  const query = `
    SELECT t.id, t.transaction_date, p.name AS product_name, u.name AS buyer_name
    FROM transactions t
    JOIN products p ON t.product_id = p.id
    JOIN users u ON t.buyer_id = u.id
    WHERE t.id = ?
  `;
  db.query(query, [id], callback);
};

// Fungsi untuk menghapus transaksi
const deleteTransaction = (id, callback) => {
  const query = "DELETE FROM transactions WHERE id = ?";
  db.query(query, [id], callback);
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  deleteTransaction,
};
