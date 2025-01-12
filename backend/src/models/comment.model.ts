import mongoose, { Document } from "mongoose";


interface CommentDocument extends Document {
	_id: mongoose.Types.ObjectId;
	author: mongoose.Types.ObjectId;
	content: string,
	likes: mongoose.Types.ObjectId[];
	createdAt: Date;
	updatedAt: Date;
}

const commentSchema = new mongoose.Schema<CommentDocument>({
	author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	content: { type: String, required: true },
	likes: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },
}, { timestamps: true })



const CommentModel = mongoose.model<CommentDocument>("Comment", commentSchema)
export default CommentModel
