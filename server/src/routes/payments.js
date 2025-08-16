import { Router } from "express";
import Payment from "../models/Payment.js";
import User from "../models/User.js";

const router = Router();

router.post("/confirm", async (req, res) => {
  try {
    const { userId, txHash, amountWei, chainId, to, contractAddress } = req.body;
    if (!userId || !txHash) return res.status(400).json({ error: "Missing fields" });
    const existing = await Payment.findOne({ txHash });
    if (existing) return res.status(200).json({ payment: existing, note: "Already recorded" });
    const payment = await Payment.create({ user: userId, txHash, amountWei: String(amountWei), chainId: String(chainId), to, contractAddress: contractAddress || "" });
    const user = await User.findById(userId);
    const until = new Date(Date.now() + 24 * 60 * 60 * 1000);
    user.canPostJobUntil = until;
    await user.save();
    res.json({ payment, canPostJobUntil: until });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
