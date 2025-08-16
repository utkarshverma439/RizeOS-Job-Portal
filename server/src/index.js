import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";
import jobRoutes from "./routes/jobs.js";
import postRoutes from "./routes/posts.js";
import paymentRoutes from "./routes/payments.js";
import aiRoutes from "./routes/ai.js";
import seed from "./seed.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "2mb" }));

const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(morgan("dev"));

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/rizeos_full_pro";
await mongoose.connect(MONGO_URI);

if (process.env.SEED === "1") {
  await seed();
}

app.get("/", (_req, res) => res.json({ ok: true, service: "rizeos-server-full" }));

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/ai", aiRoutes);

app.use((err, _req, res, _next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on :${PORT}`));
