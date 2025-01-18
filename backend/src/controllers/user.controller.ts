import { Request, Response } from "express";
import { CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND, OK, UNAUTHORIZED } from "../constants/http";
import UserModel from "../models/user.model";
import { userIdSchema } from "./auth.schema";
import { updateUserSchema } from "./user.schema";


export const authCheckHandler = async (req: Request, res: Response) => {
	try {
		const userId = req.userId
		const user = await UserModel.findById(userId)
		res.status(OK).json(user?.omitPassword())
	} catch (error) {
		res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal server Error" })
		console.log(`Error in authChecking ${error}`);
	}
}

export const getUserHandler = async (req: Request, res: Response) => {
	try {
		const targetId = userIdSchema.parse(req.params.id)

		if (!targetId) {
			res.status(UNAUTHORIZED).json({
				message: "Id not provided"
			})
			return
		}

		const targetUser = await UserModel.findById(targetId)
		if (!targetUser) {
			res.status(NOT_FOUND).json({
				message: "user not found"
			})
			return
		}

		res.status(OK).json(targetUser.omitPassword())
	} catch (error) {
		res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal server Error" })
		console.log(`Error in Getting User ${error}`);
	}
}


export const updateUserHandler = async (req: Request, res: Response) => {
	try {
		const { username, profilePic } = updateUserSchema.parse(req.body)

		const user = await UserModel.findByIdAndUpdate(req.userId, {
			username,
			profilePic
		}, { new: true })

		res.status(OK).json(user?.omitPassword())
	} catch (error) {
		res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal server Error" })
		console.log(`Error in Updating User ${error}`);
	}
}
