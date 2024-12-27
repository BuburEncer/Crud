const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE User
router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, password], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ id: result.insertId, name, email });
  });
});

// READ All Users
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

// READ User by ID
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM users WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0) return res.status(404).json({ message: "User  not found" });
    res.json(results[0]);
  });
});

// UPDATE User
router.put("/:id", (req, res) => {
  const { name, email, password } = req.body;
  const query = "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?";
  db.query(query, [name, email, password, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "User  not found" });
    res.json({ message: "User  updated successfully" });
  });
});

// DELETE User
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: "User  not found" });
    res.json({ message: "User  deleted successfully" });
  });
});

module.exports = router;
