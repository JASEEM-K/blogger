import mongoose, { Document } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";


export interface UserDocument extends Document {
	_id: mongoose.Types.ObjectId,
	username: string;
	email: string;
	profilePic: string;
	password: string;
	verified: boolean;
	createdAt: Date;
	updatedAt: Date;
	comparePassword(val: string): Promise<boolean>;
	omitPassword(): Pick<UserDocument, "_id" | "email" | "verified" | "username" | "createdAt" | "updatedAt">
}

const userSchema = new mongoose.Schema<UserDocument>({
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	profilePic: { type: String, },
	password: { type: String, required: true },
	verified: { type: Boolean, default: false },
}, { timestamps: true })

userSchema.pre("save", async function(next) {
	if (!this.isModified("password"))
		return next()
	await hashValue(this.password).then((data) => {
		this.password = data
	})
	next()
})

userSchema.methods.comparePassword = async function(val: string) {
	return compareValue(val, this.password)
}

userSchema.methods.omitPassword = function() {
	const user = this.toObject()
	delete user.password
	return user
}


const UserModel = mongoose.model<UserDocument>("User", userSchema)
export default UserModel
