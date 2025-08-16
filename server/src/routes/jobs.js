import { Router } from "express";
import Job from "../models/Job.js";
import User from "../models/User.js";
import { authRequired } from "../middleware/auth.js";

const router = Router();

router.post("/", authRequired, async (req, res) => {
  try {
    const me = await User.findById(req.userId);
    const now = new Date();
    if (!me.canPostJobUntil || me.canPostJobUntil < now) {
      return res.status(402).json({ error: "Platform fee required before posting job" });
    }
    const { title, description, skills = [], location = "Remote", budget = "" } = req.body;
    const job = await Job.create({ owner: me._id, title, description, skills, location, budget });
    res.json({ job });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.get("/", async (req, res) => {
  const { skill, location, q } = req.query;
  const filter = {};
  if (skill) filter.skills = { $in: [skill.toLowerCase()] };
  if (location) filter.location = new RegExp(location, "i");
  if (q) filter.$or = [{ title: new RegExp(q, "i") }, { description: new RegExp(q, "i") }];
  const jobs = await Job.find(filter).sort({ createdAt: -1 }).lean();
  res.json({ jobs });
});

export default router;
