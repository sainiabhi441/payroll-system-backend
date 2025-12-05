// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI missing in .env file");
    }

    await mongoose.connect(uri);

    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.error("MongoDB Error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
