import { Router } from "express";
import Post from "../models/Post.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

router.post("/", authRequired, async (req, res) => {
  const { text } = req.body;
  const post = await Post.create({ author: req.userId, text });
  res.json({ post });
});

router.get("/", async (_req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).lean();
  res.json({ posts });
});

export default router;
