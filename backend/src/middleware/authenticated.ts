import { Response, Request, NextFunction } from 'express'
import { INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED } from '../constants/http'
import { verifyToken } from '../utils/jwt'
import UserModel from '../models/user.model'

export const authenticated = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.cookies.jwt

		const { decode, errorMessage } = verifyToken(token)
		if (errorMessage) {
			res.status(UNAUTHORIZED).json({
				message: errorMessage
			})
		}

		if (!decode) {
			res.status(UNAUTHORIZED).json({
				message: "Invalid token"
			})
		}

		const user = await UserModel.findById(decode?.userId)

		if (!user) {
			res.status(NOT_FOUND).json({
				message: "user not found"
			})
		}

		req.userId = decode?.userId

		next()
	} catch (error) {
		res.status(INTERNAL_SERVER_ERROR).json({
			message: "Internal server Error "
		})
		console.log("Error in authenticating user ", error);

	}
}
