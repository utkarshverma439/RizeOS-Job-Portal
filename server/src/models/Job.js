import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  skills: { type: [String], default: [] },
  location: { type: String, default: "Remote" },
  budget: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Job", JobSchema);
