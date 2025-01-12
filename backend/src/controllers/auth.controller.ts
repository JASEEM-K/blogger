import { Request, Response } from 'express'
import { loginSchema, registerSchema } from './auth.schema'
import UserModel from '../models/user.model'
import { CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from '../constants/http'
import { compareValue } from '../utils/bcrypt'
import { signToken, tokenOptions } from '../utils/jwt'


export const registerHandler = async (req: Request, res: Response) => {
	try {
		const { email, username, password } = registerSchema.parse(req.body)

		const isExistingUser = await UserModel.exists({
			$or: [
				{ email: email },
				{ username: username },
			]
		})
		if (isExistingUser) {
			res.status(CONFLICT).json({
				message: "Username or Email is Already using by someone else"
			})
			return
		}

		if (password.length < 6 || password.length > 25) {
			res.status(CONFLICT).json({
				message: "Password must be legth between 6-25"
			})
			return
		}

		const newUser = await UserModel.create({
			username,
			email,
			password,
		})

		signToken({ userId: newUser._id }, res)

		res.status(OK).json(newUser.omitPassword())

	} catch (error) {

		res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal server Error" })
		console.log(`Error in registering User ${error}`);
	}
}

export const loginHandler = async (req: Request, res: Response) => {
	try {
		const { username, password } = loginSchema.parse(req.body)

		const user = await UserModel.findOne({ username })
		if (!user) {
			res.status(NOT_FOUND).json({
				message: "User not found"
			})
			return
		}

		if (password.length < 6 || password.length > 25) {
			res.status(CONFLICT).json({
				message: "Password must be legth between 6-25"
			})
			return
		}

		const isValid = await compareValue(user.password, password)
		if (!isValid) {
			res.status(NOT_FOUND).json({
				message: "Password is Wrong"
			})
			return
		}

		signToken({ userId: user._id }, res)
		res.status(OK).json(user.omitPassword())

	} catch (error) {

		res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal server Error" })
		console.log(`Error in Login User ${error}`);
	}
}

