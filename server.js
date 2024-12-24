const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "2005", // Replace with your MySQL password
  database: "workers_db", // Replace with your database name
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database.");
});

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the static HTML form
app.use(express.static(path.join(__dirname, "public")));

// Route to handle form submission
app.post("/submit", (req, res) => {
  const { name, type, lat, lng, contact_no } = req.body;
  const sql =
    "INSERT INTO workers (name, type, lat, lng, contact_no) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [name, type, lat, lng, contact_no], (err, result) => {
    if (err) throw err;
    res.send("Worker information added successfully!");
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
