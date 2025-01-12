import mongoose, { Document } from "mongoose";
import { compareValue, hashValue } from "../utils/bcrypt";


export interface UserDocument extends Document {
	_id: mongoose.Types.ObjectId,
	username: string;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	comparePassword(val: string): Promise<boolean>;
	omitPassword(): Pick<UserDocument, "_id" | "email" | "username" | "createdAt" | "updatedAt">
}

const userSchema = new mongoose.Schema<UserDocument>({
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
}, { timestamps: true })

userSchema.pre("save", async function(next) {
	if (!this.isModified("password"))
		return next()
	this.password === await hashValue(this.password)
	next()
})

userSchema.methods.comparePassword = async function(val: string) {
	return compareValue(val, this.password)
}

userSchema.methods.omitPassword = function() {
	const user = this.toObject()
	delete user.passwrod;
	return user
}


const UserModel = mongoose.model<UserDocument>("User", userSchema)
export default UserModel
