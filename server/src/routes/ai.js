import { Router } from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import User from "../models/User.js";
import Job from "../models/Job.js";
import { extractSkills } from "../utils/skills.js";
import { cosineSim, tfidfSimilarity } from "../utils/match.js";

const upload = multer();
const router = Router();

router.post("/extract-skills", (req, res) => {
  const { text } = req.body;
  const skills = extractSkills(text || "");
  res.json({ skills });
});

router.get("/match", async (req, res) => {
  const { userId, jobId } = req.query;
  const user = await User.findById(userId).lean();
  const job = await Job.findById(jobId).lean();
  if (!user || !job) return res.status(404).json({ error: "Not found" });
  const score = cosineSim((user.skills || []).map(s => s.toLowerCase()), (job.skills || []).map(s => s.toLowerCase()));
  const tfidf = tfidfSimilarity(user.bio || "", job.description || "");
  res.json({ score, tfidf, userSkills: user.skills, jobSkills: job.skills });
});

router.post("/parse-resume", upload.single("file"), async (req, res) => {
  try {
    let text = "";
    if (!req.file) {
      text = (req.body.text || "").toString();
    } else if (req.file.mimetype === "application/pdf") {
      const data = await pdfParse(req.file.buffer);
      text = data.text || "";
    } else {
      text = req.file.buffer.toString("utf8");
    }
    const skills = extractSkills(text);
    res.json({ text, skills });
  } catch (e) {
    res.status(400).json({ error: e.message || "Failed to parse resume" });
  }
});

export default router;
