import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import HealthData from "../models/healthData.js";

const router = express.Router();

// @route POST /api/healthdata
// @desc  Add manual entry data
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newData = new HealthData({ ...req.body, user: req.userId });
    await newData.save();

    res.status(201).json({ message: "Data saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving data" });
  }
});

export default router;
