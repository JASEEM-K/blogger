import mongoose from "mongoose";


interface BlogDocument extends mongoose.Document {
	_id: mongoose.Types.ObjectId;
	title: string;
	content: string;
	likes: mongoose.Types.ObjectId[];
	comment: mongoose.Types.ObjectId[];
	createdAt: Date;
	updatedAt: Date;
}

const blogSchema = new mongoose.Schema<BlogDocument>({
	title: { type: String, required: true },
	content: { type: String, required: true },
	likes: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] },
	comment: { type: [mongoose.Schema.Types.ObjectId], ref: "User", default: [] }
}, { timestamps: true })

const BlogModel = mongoose.model<BlogDocument>("Blog", blogSchema)
export default BlogModel
