import { z } from "zod";

export const emailSchema = z.string().email().min(4)
const passwordSchema = z.string().min(6).max(25);

export const loginSchema = z.object({
	username: z.string().min(3),
	password: passwordSchema,
})


export const registerSchema = loginSchema.extend({
	email: emailSchema,
})

export const verifyIdSchema = z.string()

export const userIdSchema = z.string()

export const resetPasswordSchema = z.object({
	password: passwordSchema,
	confirmPassword: passwordSchema,
})
