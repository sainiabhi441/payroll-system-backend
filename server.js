require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const employeesRoutes = require("./routes/employees");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// CORS (no credentials needed)
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://sainiabhi441.github.io"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
  })
);

// Middleware
app.use(express.json());

// Routes
app.use("/api/employees", employeesRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "API running" });
});

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
