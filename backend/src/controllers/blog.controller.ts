import { Response, Request } from "express";
import { commentSchema, createBlogSchema, updateBlogSchema } from "./blog.schema";
import { CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND, OK, UNAUTHORIZED } from "../constants/http";
import BlogModel from "../models/blog.model";
import { userIdSchema } from "./auth.schema";
import CommentModel from "../models/comment.model";


export const createBlogHandler = async (req: Request, res: Response) => {
	try {
		const { title, content } = createBlogSchema.parse(req.body)
		if (!title.trim() || !content.trim()) {
			res.status(CONFLICT).json({
				message: "Please provide all the fields"
			})
			return
		}


		const blog = await BlogModel.create({
			title,
			content,
			author: req.userId,
		})

		res.status(OK).json(blog)
	} catch (error) {
		res.status(INTERNAL_SERVER_ERROR).json({
			message: "Internal server error "
		})
		console.log("Error in  Creating blog ", error)
	}
}

export const updateBlogHandler = async (req: Request, res: Response) => {
	try {
		const { title, content } = updateBlogSchema.parse(req.body)
		const blogId = userIdSchema.parse(req.params.id)
		if (!title?.trim() && !content?.trim()) {
			res.status(CONFLICT).json({
				message: "atleast give one field "
			})
			return
		}

		const blog = await BlogModel.findByIdAndUpdate(blogId, {
			title,
			content,
		}, { new: true })

		res.status(OK).json(blog)
	} catch (error) {
		console.log("Error in  Updating blog ", error)
		res.status(INTERNAL_SERVER_ERROR).json({
			message: "Internal server error "
		})
	}
}

export const deleteBlogHandler = async (req: Request, res: Response) => {
	try {
		const blogId = userIdSchema.parse(req.params.id)
		if (!blogId) {
			res.status(CONFLICT).json({
				message: "id not provided"
			})
			return
		}

		const blog = await BlogModel.findById(blogId)
		if (!blog) {
			res.status(NOT_FOUND).json({
				message: "blog not found"
			})
			return
		}

		if (blog.author !== req.userId) {
			res.status(UNAUTHORIZED).json({
				message: "not authorized to delete this blog"
			})
			return
		}

		await BlogModel.findByIdAndDelete(blogId)
		res.status(OK).json({
			message: "blog deleted successfully"
		})

	} catch (error) {
		console.log("Error in  Deleting blog ", error)
		res.status(INTERNAL_SERVER_ERROR).json({
			message: "Internal server error "
		})
	}
}


export const getBlogHandler = async (req: Request, res: Response) => {
	try {
		const blogId = userIdSchema.parse(req.params.id)
		if (!blogId) {
			res.status(CONFLICT).json({
				message: "id is not provided"
			})
			return
		}

		const blog = await BlogModel.findById(blogId)
			.populate("comment")
		if (!blog) {
			res.status(NOT_FOUND).json({
				messag: "blog not found"
			})
			return
		}

		res.status(OK).json(blog)

	} catch (error) {
		console.log("Error in  Getting blog ", error)
		res.status(INTERNAL_SERVER_ERROR).json({
			message: "Internal server error "
		})
	}
}

export const getAllBlogHandler = async (_: Request, res: Response) => {
	try {
		const blogs = await BlogModel.find()
		if (!blogs) {
			res.status(OK).json({
				message: "no blogs is available"
			})
			return
		}
		res.status(OK).json(blogs)
	} catch (error) {
		console.log("Error in  Getting all the blog ", error)
		res.status(INTERNAL_SERVER_ERROR).json({
			message: "Internal server error "
		})
	}
}

export const toggleLikeHandler = async (req: Request, res: Response) => {
	try {
		const blogId = userIdSchema.parse(req.params.id)
		if (!blogId) {
			res.status(CONFLICT).json({
				message: "id is not provided"
			})
			return
		}

		const blog = await BlogModel.findById(blogId)
		if (!blog) {
			res.status(NOT_FOUND).json({
				message: "blog not found"
			})
			return
		}

		if (!blog.likes.includes(req.userId)) {
			await BlogModel.findByIdAndUpdate(blogId, {
				$push: { likes: req.userId }
			})
			blog.likes.push(req.userId)
		} else if (blog.likes.includes(req.userId)) {
			await BlogModel.findByIdAndUpdate(blogId, {
				$pull: { likes: req.userId }
			})
			blog.likes = blog.likes.filter((like) => like !== req.userId)
		}

		res.status(OK).json(blog)

	} catch (error) {
		console.log("Error in  Liking the blog ", error)
		res.status(INTERNAL_SERVER_ERROR).json({
			message: "Internal server error "
		})
	}
}


export const commentHandler = async (req: Request, res: Response) => {
	try {
		const { content } = commentSchema.parse(req.body)
		const blogId = userIdSchema.parse(req.params.id)

		if (!content.trim()) {
			res.status(CONFLICT).json({
				message: "fill the fields"
			})
			return
		}

		if (!blogId) {
			res.status(CONFLICT).json({
				message: "id is not provided"
			})
			return
		}

		const blogExist = await BlogModel.exists({
			_id: blogId
		})
		if (!blogExist) {
			res.status(NOT_FOUND).json({
				message: "blog not found"
			})
			return
		}

		const comment = await CommentModel.create({
			author: req.userId,
			content,
		})

		const blog = await BlogModel.findByIdAndUpdate(blogId, {
			$push: { content: comment._id }
		}, { new: true })

		res.status(OK).json(blog)

	} catch (error) {
		console.log("Error in Commenting on the blog ", error)
		res.status(INTERNAL_SERVER_ERROR).json({
			message: "Internal server error "
		})
	}
}

export const toggleLikeCommentHandle = async (req: Request, res: Response) => {
	try {
		const commentId = userIdSchema.parse(req.params.id)
		if (!commentId) {
			res.status(CONFLICT).json({
				message: 'id is not provided'
			})
			return
		}

		const comment = await CommentModel.findById(commentId)
		if (!comment) {
			res.status(NOT_FOUND).json({
				message: "comment not found"
			})
			return
		}

		if (!comment.likes.includes(req.userId)) {
			await CommentModel.findByIdAndUpdate(commentId, {
				$push: { likes: req.userId }
			})
			comment.likes.push(req.userId)
		} else if (comment.likes.includes(req.userId)) {
			await CommentModel.findByIdAndUpdate(commentId, {
				$pull: { likes: req.userId }
			})
			comment.likes = comment.likes.filter((like) => like !== req.userId)
		}

		res.status(OK).json(comment)

	} catch (error) {
		console.log("Error in liking comment on the blog ", error)
		res.status(INTERNAL_SERVER_ERROR).json({
			message: "Internal server error "
		})
	}
}

