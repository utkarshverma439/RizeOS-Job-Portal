import { Router } from "express";
import User from "../models/User.js";
import { authRequired } from "../middleware/auth.js";
import { extractSkills } from "../utils/skills.js";

const router = Router();

router.get("/me", authRequired, async (req, res) => {
  const user = await User.findById(req.userId).lean();
  res.json({ user });
});

router.put("/me", authRequired, async (req, res) => {
  const { name, bio, linkedin, skills, walletAddress, autoExtract } = req.body;
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  user.name = name ?? user.name;
  user.bio = bio ?? user.bio;
  user.linkedin = linkedin ?? user.linkedin;
  user.walletAddress = walletAddress ?? user.walletAddress;
  if (autoExtract && (bio || user.bio)) {
    const extracted = extractSkills(bio || user.bio);
    const merged = new Set([...(skills || []), ...extracted]);
    user.skills = Array.from(merged);
  } else if (Array.isArray(skills)) {
    user.skills = skills;
  }
  await user.save();
  res.json({ user });
});

export default router;
