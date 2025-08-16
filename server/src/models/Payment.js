import mongoose from "mongoose";
const PaymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  txHash: { type: String, required: true, unique: true },
  amountWei: { type: String, required: true },
  chainId: { type: String, required: true },
  to: { type: String, required: true },
  contractAddress: { type: String, default: "" }
}, { timestamps: true });
export default mongoose.model("Payment", PaymentSchema);
