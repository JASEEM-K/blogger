import { z } from "zod";


export const updateUserSchema = z.object({
	username: z.string().optional(),
	profilePic: z.string().optional(),
})

