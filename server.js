require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const employeesRoutes = require('./routes/employees');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173'
}));

// Routes
app.use('/api/employees', employeesRoutes);

// Redirect root → employees list
app.get('/', (req, res) => {
  res.redirect('/api/employees');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
