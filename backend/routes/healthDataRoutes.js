import express from "express";
import { addHealthData, getHealthData } from "../controllers/healthController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/", authMiddleware, addHealthData);
router.get("/", authMiddleware, getHealthData);

export default router;