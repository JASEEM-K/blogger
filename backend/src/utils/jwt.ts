import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { UserDocument } from "../models/user.model"
import { JWT_SECRET, NODE_ENV } from '../constants/env'
import { Response } from 'express'


type PayloadType = {
	userId: UserDocument["_id"]
}

export const signToken = (payload: PayloadType, res: Response) => {
	const token = jwt.sign(payload, JWT_SECRET, {
		expiresIn: "30d",
	})
	res.cookie("jwt", token, {
		maxAge: 7 * 24 * 60 * 60 * 1000,
		httpOnly: true,
		sameSite: "strict",
		secure: NODE_ENV === 'production'
	})
}


export const verifyToken = (token: string) => {
	try {
		const decode = jwt.verify(token, JWT_SECRET) as PayloadType
		return { decode }
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			return { errorMessage: "token expired" }
		} else if (error instanceof JsonWebTokenError) {
			return { errorMessage: "Invalid token" }
		} else {
			return { errorMessage: "token expired" }
		}
	}

}
