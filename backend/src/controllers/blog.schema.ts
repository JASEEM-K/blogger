import { z } from "zod";


export const createBlogSchema = z.object({
	title: z.string(),
	titlePic: z.string(),
	content: z.string(),
	tag: z.string(),
})

export const updateBlogSchema = z.object({
	title: z.string().optional(),
	content: z.string().optional(),
	tag: z.string().optional(),
	image: z.string().optional(),
})

export const commentSchema = z.object({
	content: z.string()
})

export const imageSchema = z.object({
	image: z.string()
})

export const tagSchema = z.string()
