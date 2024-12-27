const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "toko_bekas",
});
db.connect(function (error) {
  if (error) throw error;
  console.log("Koneksi ke database berhasil!");
});

module.exports = db;
