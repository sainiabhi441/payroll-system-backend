const express = require("express");
const router = express.Router();

const {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getAverages,
} = require("../controllers/employeeController");

// ✅ FIRST: specific routes
router.get("/averages", getAverages);

// ✅ THEN: general routes
router.get("/", getAllEmployees);
router.post("/", addEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;
