const db = require("../db");

// Fungsi untuk membuat pengguna baru
const createUser = (user, callback) => {
  const { name, email, password } = user;
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, password], callback);
};

// Fungsi untuk mendapatkan semua pengguna
const getAllUsers = (callback) => {
  const query = "SELECT * FROM users";
  db.query(query, callback);
};

// Fungsi untuk mendapatkan pengguna berdasarkan ID
const getUserById = (id, callback) => {
  const query = "SELECT * FROM users WHERE id = ?";
  db.query(query, [id], callback);
};

// Fungsi untuk memperbarui pengguna
const updateUser = (id, user, callback) => {
  const { name, email, password } = user;
  const query = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
  db.query(query, [name, email, password, id], callback);
};

// Fungsi untuk menghapus pengguna
const deleteUser = (id, callback) => {
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [id], callback);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
