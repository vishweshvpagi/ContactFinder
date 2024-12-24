const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "2005",
  database: process.env.DB_NAME || "workers_db",
  port: process.env.DB_PORT || 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to MySQL database.");
});

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // For parsing form data
app.use(express.static(path.join(__dirname, "public"))); // Serve static files

// Function to calculate distance
function calculateDistance(lat1, lng1, lat2, lng2) {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in km

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// API routes
app.get("/api/find-nearest", (req, res) => {
  const { service, lat, lng } = req.query;

  if (!service || !lat || !lng) {
    return res.status(400).json({ error: "Invalid query parameters" });
  }

  const query = "SELECT * FROM workers WHERE type = ?";
  db.query(query, [service], (err, results) => {
    if (err) {
      console.error("Error fetching workers:", err);
      return res.status(500).json({ error: "Database error" });
    }

    let nearestWorker = null;
    let minDistance = Infinity;

    results.forEach((worker) => {
      const distance = calculateDistance(lat, lng, worker.lat, worker.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearestWorker = { ...worker, distance: minDistance.toFixed(2) };
      }
    });

    if (nearestWorker) {
      res.json(nearestWorker);
    } else {
      res.status(404).json({ error: "No service provider found." });
    }
  });
});

app.post("/api/add-provider", (req, res) => {
  const { name, serviceType, contact, lat, lng } = req.body;

  // Input validation
  if (!name || !serviceType || !contact || !lat || !lng) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // SQL query to insert data
  const query =
    "INSERT INTO workers (name, type, contact, lat, lng) VALUES (?, ?, ?, ?, ?)";

  db.query(query, [name, serviceType, contact, lat, lng], (err, result) => {
    if (err) {
      console.error("Error inserting provider:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ success: true });
  });
});

app.post("/submit", (req, res) => {
  const { name, type, lat, lng, contact_no } = req.body;
  const sql =
    "INSERT INTO workers (name, type, lat, lng, contact_no) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [name, type, lat, lng, contact_no], (err, result) => {
    if (err) {
      console.error("Error inserting worker:", err);
      return res.status(500).send("Database error");
    }
    res.send("Worker information added successfully!");
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
