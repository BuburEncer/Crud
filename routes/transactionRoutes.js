const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// Rute untuk menambah transaksi
router.post("/", (req, res) => {
  const { product_id, buyer_id } = req.body;

  // Cek apakah 'product_id' dan 'buyer_id' ada
  if (!product_id || !buyer_id) {
    return res.status(400).json({ message: "Product ID and Buyer ID are required" });
  }

  Transaction.createTransaction({ product_id, buyer_id }, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({
      id: result.insertId,
      product_id,
      buyer_id,
      transaction_date: new Date().toISOString(),
    });
  });
});

module.exports = router;
