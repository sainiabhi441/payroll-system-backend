// models/Employee.js
const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    empId: {
      type: Number,
      unique: true,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    basic: {
      type: Number,
      required: true,
    },

    hra: {
      type: Number,
      required: true,
    },

    da: {
      type: Number,
      required: true,
    },

    pf: {
      type: Number,
      required: true,
    },

    gross: {
      type: Number,
      required: true,
    },

    // ✅ Attendance (frontend empty bhej sakta hai)
    workingDays: {
      type: Number,
      default: 26,
    },

    presentDays: {
      type: Number,
      default: 26,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
