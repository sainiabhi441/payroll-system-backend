require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const employeesRoutes = require("./routes/employees");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// 🔥 Updated CORS to allow GitHub Pages Frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://sainiabhi441.github.io" // 👈 GitHub Pages allowed
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  })
);

// Routes
app.use("/api/employees", employeesRoutes);

// Redirect "/" → "/api/employees"
app.get("/", (req, res) => {
  res.redirect("/api/employees");
});

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
