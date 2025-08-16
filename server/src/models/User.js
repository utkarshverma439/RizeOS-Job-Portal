import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  bio: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  skills: { type: [String], default: [] },
  walletAddress: { type: String, default: "" },
  canPostJobUntil: { type: Date, default: null }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
