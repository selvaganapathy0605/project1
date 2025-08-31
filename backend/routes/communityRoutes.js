import express from "express";
import { createPost, getPosts, likePost } from "../controllers/communityController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", authMiddleware, getPosts);
router.post("/:postId/like", authMiddleware, likePost);

export default router;
