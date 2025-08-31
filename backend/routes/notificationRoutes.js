import express from "express";
import {
  createNotification,
  getNotifications,
  markAsRead,
} from "../controllers/notificationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/", authMiddleware, createNotification);
router.get("/", authMiddleware, getNotifications);
router.patch("/:id", authMiddleware, markAsRead);

export default router;
