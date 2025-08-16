import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Post from "./models/Post.js";
import Job from "./models/Job.js";

export default async function seed() {
  try {
    const any = await User.findOne({ email: "demo@rizeos.dev" });
    if (any) return;
    const passwordHash = await bcrypt.hash("demo1234", 10);
    const demo = await User.create({
      name: "Demo User",
      email: "demo@rizeos.dev",
      passwordHash,
      bio: "Full-stack engineer with React, Node, Solidity, ethers, AWS. Built AI matching, resume parsing, and Web3 payments.",
      skills: ["react","node","solidity","ethers","aws","nlp"],
      walletAddress: ""
    });
    await Post.insertMany([
      { author: demo._id, text: "🚀 Kicked off an open-source Job & Networking Portal with Web3 and AI!" },
      { author: demo._id, text: "📢 Hiring a React + Web3 intern. DM if you love building!" },
      { author: demo._id, text: "🧠 Just added TF-IDF based job matching and resume parsing." }
    ]);
    await Job.insertMany([
      { owner: demo._id, title: "Full-stack Web3 Engineer (Intern)", description: "Build dApps, integrate wallet auth, implement ERC-20/721 flows, and ship fast.", skills: ["react","solidity","ethers"], location: "Remote", budget: "₹50k/month" },
      { owner: demo._id, title: "AI Engineer (NLP)", description: "Resume parsing, recommendation, embeddings/TF-IDF, model serving.", skills: ["python","nlp","pytorch"], location: "Bengaluru", budget: "₹60k/month" },
      { owner: demo._id, title: "Backend Engineer", description: "Express APIs, MongoDB, Redis, background jobs, clean code.", skills: ["node","express","mongodb"], location: "Pune", budget: "₹40k/month" }
    ]);
    console.log("Seeded demo user (demo@rizeos.dev / demo1234), posts, and jobs.");
  } catch (e) {
    console.error("Seed error:", e);
  }
}
