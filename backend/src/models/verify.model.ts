import mongoose from "mongoose";

type verifyType = "emailVerify" | "resetPassword"
interface VerifyDocument extends mongoose.Document {
	_id: mongoose.Types.ObjectId;
	author?: mongoose.Types.ObjectId;
	type: verifyType,
	createdAt: Date,
}

const verifySchema = new mongoose.Schema<VerifyDocument>({
	author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	type: { type: String, enum: ["emailVerify", "resetPassword"], required: true },
	createdAt: { type: Date, default: Date.now, expires: 900 },
	// this line make this thing expires in 900s wich mean in 15m
})

const VerifyModel = mongoose.model<VerifyDocument>("Verify", verifySchema)
export default VerifyModel
