import { z } from "zod";


export const createBlogSchema = z.object({
	title: z.string(),
	content: z.string(),
})

export const updateBlogSchema = z.object({
	title: z.string().optional(),
	content: z.string().optional(),
})

export const commentSchema = z.object({
	content: z.string()
})

export const imageSchema = z.object({
	image: z.string()
})
