const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const methodOverride = require("method-override");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", "./views");

// Routes
app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/transactions", transactionRoutes);

// Rute untuk menangani GET request ke root ("/")
app.get("/", (req, res) => {
  res.redirect("/user");
});

// Rute untuk menampilkan halaman pengguna
app.get("/user", (req, res) => {
  res.render("user"); // Render halaman user.ejs
});

// Rute untuk menampilkan halaman input
app.get("/input", (req, res) => {
  res.render("input"); // Render halaman input.ejs
});

// Rute untuk menampilkan halaman transaksi
app.get("/transaction", (req, res) => {
  res.render("transaction"); // Render halaman transaction.ejs
});

// Rute untuk menampilkan halaman product
app.get("/product", (req, res) => {
  res.render("product"); // Render halaman product.ejs
});

app.get("/", (req, res) => {
  res.render("index"); // Render file index.ejs
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
