import express from "express";
import Profile from "../models/profile.js";
import authMiddleware from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const newProfile = new Profile({ ...req.body, user: req.userId });
    await newProfile.save();
    res.status(201).json({ message: "Profile saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving profile" });
  }
});

export default router;
