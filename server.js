require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const employeesRoutes = require("./routes/employees");

const app = express();
const PORT = process.env.PORT || 5000;

/* =========================
   DATABASE
========================= */
connectDB();

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://sainiabhi441.github.io",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

/* =========================
   ROUTES
========================= */
app.use("/api/employees", employeesRoutes);


// 👇 AUTO REDIRECT ROOT → API
app.get("/", (req, res) => {
  res.redirect("/api/employees");
});


// Root / Health check
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Payroll System API is running 🚀",
  });
});

/* =========================
   SERVER
========================= */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
