// controllers/employeeController.js

const Employee = require("../models/Employee");
const { calcSalary } = require("../utils/salaryCalc");

// Generate unique 4-digit ID
async function generate4DigitId() {
  while (true) {
    const id = Math.floor(1000 + Math.random() * 9000); // 1000-9999
    const exists = await Employee.findOne({ empId: id });
    if (!exists) return id; // unique ID found
  }
}

// -------------------- GET ALL EMPLOYEES --------------------
exports.getAllEmployees = async (req, res) => {
  try {
    const list = await Employee.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Error fetching employees" });
  }
};

// -------------------- ADD NEW EMPLOYEE --------------------
exports.addEmployee = async (req, res) => {
  try {
    const { name, department, designation, basic } = req.body;

    if (!name || !department || !designation || basic == null) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Calculate salary fields
    const salary = calcSalary(basic, designation);

    // Generate unique empId
    const empId = await generate4DigitId();

    const employee = new Employee({
      empId,
      name,
      department,
      designation,
      basic: salary.basic,
      hra: salary.hra,
      da: salary.da,
      pf: salary.pf,
      gross: salary.gross,
    });

    await employee.save();

    res.status(201).json(employee);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error creating employee" });
  }
};

// -------------------- UPDATE EMPLOYEE --------------------
exports.updateEmployee = async (req, res) => {
  try {
    const empId = req.params.id;
    const { name, department, designation, basic } = req.body;

    const emp = await Employee.findOne({ empId });

    if (!emp) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Recalculate salary
    const salary = calcSalary(basic, designation);

    emp.name = name;
    emp.department = department;
    emp.designation = designation;
    emp.basic = salary.basic;
    emp.hra = salary.hra;
    emp.da = salary.da;
    emp.pf = salary.pf;
    emp.gross = salary.gross;

    await emp.save();

    res.json(emp);
  } catch (err) {
    res.status(500).json({ message: "Error updating employee" });
  }
};

// -------------------- DELETE EMPLOYEE --------------------
exports.deleteEmployee = async (req, res) => {
  try {
    const empId = req.params.id;

    const deleted = await Employee.findOneAndDelete({ empId });

    if (!deleted) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting employee" });
  }
};

// -------------------- AVERAGES PER DEPARTMENT --------------------
exports.getAverages = async (req, res) => {
  try {
    const data = await Employee.aggregate([
      {
        $group: {
          _id: "$department",
          totalGross: { $sum: "$gross" },
          avgGross: { $avg: "$gross" },
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error calculating averages" });
  }
};
