// routes/employees.js
const express = require("express");
const router = express.Router();

const {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getAverages,
} = require("../controllers/employeeController");

// API Routes
router.get("/", getAllEmployees);
router.post("/", addEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

// department-wise averages
router.get("/averages", getAverages);

module.exports = router;
