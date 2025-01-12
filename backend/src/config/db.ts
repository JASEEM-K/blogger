import mongoose from "mongoose"
import { MONGO_URI } from "../constants/env"


export const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI)
		console.log(`Connected to Mongo Db`)
	} catch (error) {
		console.log(`Error Connected to Mongo Db ${error}`)
	}
}
