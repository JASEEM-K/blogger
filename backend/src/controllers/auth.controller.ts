import { Request, Response } from 'express'
import { emailSchema, loginSchema, registerSchema, resetPasswordSchema, verifyIdSchema } from './auth.schema'
import UserModel from '../models/user.model'
import { CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND, OK, UNAUTHORIZED } from '../constants/http'
import { compareValue } from '../utils/bcrypt'
import { signToken } from '../utils/jwt'
import VerifyModel from '../models/verify.model'
import { APP_ORIGIN } from '../constants/env'
import { sendMail } from '../utils/resend'
import { getPasswordResetTemplate, getVerifyEmailTemplate } from '../utils/emailTemplate'


export const registerHandler = async (req: Request, res: Response) => {
	try {
		const { email, username, password, confirmPassword } = registerSchema.parse(req.body)

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

		if (password !== confirmPassword) {
			res.status(CONFLICT).json({
				message: "passwords do not match"
			})
			return
		}


		const newUser = await UserModel.create({
			username,
			email,
			password,
		})

		const verifyVal = await VerifyModel.create({
			author: newUser._id,
			type: "emailVerify"
		})
		const url = `${APP_ORIGIN}/email/verify/${verifyVal._id}`
		const { error } = await sendMail({
			to: newUser.email,
			...getVerifyEmailTemplate(url),
		})
		if (error) {
			console.log("Error in sending email", error)
		}

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

		const isValid = await compareValue(password, user.password)
		if (!isValid) {
			res.status(UNAUTHORIZED).json({
				message: "Password is Wrong"
			})
			return
		}

		signToken({ userId: user._id }, res)
		res.status(OK).json(user.omitPassword())

	} catch (error) {
		console.log(`Error in Login User ${error}`);
		res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal server Error" })
	}
}

export const logoutHandler = (req: Request, res: Response) => {
	try {
		const token = req.cookies.jwt
		if (!token) {
			res.status(CONFLICT).json({
				message: "token not found"
			})
			return
		}
		res.clearCookie("jwt")
		res.status(OK).json({
			message: "logout successful"
		})
	} catch (error) {
		res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal server Error" })
		console.log(`Error in authChecking ${error}`);
	}
}

export const verifyEmailHandler = async (req: Request, res: Response) => {
	try {
		const verifyId = verifyIdSchema.parse(req.params.code)
		if (!verifyId) {
			res.status(NOT_FOUND).json({
				message: "Verify code not found"
			})
			return
		}

		const verify = await VerifyModel.findById(verifyId)
		if (!verify) {
			res.status(UNAUTHORIZED).json({
				message: "Invalid code"
			})
			return
		}

		if (verify.type !== "emailVerify") {
			res.status(UNAUTHORIZED).json({
				message: "Wrong code"
			})
			return
		}

		if (verify.author?.toString() !== req.userId.toString()) {
			res.status(UNAUTHORIZED).json({
				message: "Invalid code: Not a your code"
			})
			return
		}

		const newUser = await UserModel.findByIdAndUpdate(req.userId, { verified: true }, { new: true })
		res.status(OK).json(newUser?.omitPassword())

	} catch (error) {
		res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal server Error" })
		console.log(`Error in Verifying the user ${error}`);
	}
}

export const sendResetPasswordHandler = async (req: Request, res: Response) => {
	try {
		const userEmail = emailSchema.parse(req.body.email)
		if (!userEmail) {
			res.status(UNAUTHORIZED).json({
				message: "No email Provided"
			})
		}
		const exist = await UserModel.exists({ email: userEmail })
		if (!exist) {
			res.status(NOT_FOUND).json({
				message: "User not found"
			})
		}

		const verifyCode = await VerifyModel.create({
			type: "resetPassword",
		})
		const url = `${APP_ORIGIN}/forgot/reset/${verifyCode._id}`
		const { error } = await sendMail({
			to: userEmail,
			...getPasswordResetTemplate(url)
		})

		if (error) {
			console.log("Error in reseting Password", error)
			res.status(CONFLICT).json({
				message: "Something went wrong"
			})
		}

		res.status(OK).json({
			message: "reset code send successfuly"
		})

	} catch (error) {
		res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal server Error" })
		console.log(`Error in sending reset code to the user ${error}`);
	}
}

export const resetPasswordHandler = async (req: Request, res: Response) => {
	try {
		const verifyId = verifyIdSchema.parse(req.params.code)
		const { password, confirmPassword } = resetPasswordSchema.parse(req.body)

		if (!verifyId) {
			res.status(NOT_FOUND).json({
				message: "Verify code not found"
			})
			return
		}

		if (password !== confirmPassword) {
			res.status(CONFLICT).json({
				message: "passwords must be same"
			})
			return
		}

		if (password.length < 6) {
			res.status(CONFLICT).json({
				message: "password must be arleast 6 character"
			})
			return
		}


		const verify = await VerifyModel.findById(verifyId)
		if (!verify) {
			res.status(UNAUTHORIZED).json({
				message: "Invalid code"
			})
			return
		}

		if (verify.type !== "resetPassword") {
			res.status(UNAUTHORIZED).json({
				message: "Wrong code"
			})
			return
		}

		const user = await UserModel.findById(req.userId)
		if (!user) {
			res.status(NOT_FOUND).json({
				message: "user not found"
			})
			return
		}

		user.password = password
		await user.save()

		res.status(OK).json(user.omitPassword())

	} catch (error) {
		res.status(INTERNAL_SERVER_ERROR).json({ message: "Internal server Error" })
		console.log(`Error in Verifying the user ${error}`);
	}
}

