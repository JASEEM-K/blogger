import { Response, Request } from "express";
import { commentSchema, createBlogSchema, imageSchema, tagSchema, updateBlogSchema } from "./blog.schema";
import { CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND, OK, UNAUTHORIZED } from "../constants/http";
import BlogModel from "../models/blog.model";
import { userIdSchema } from "./auth.schema";
import CommentModel from "../models/comment.model";
import { v2 as cloudinary } from 'cloudinary'
import UserModel from "../models/user.model";


export const createBlogHandler = async (req: Request, res: Response) => {
	try {
		const { title, content, image, tag } = createBlogSchema.parse(req.body)
		if (!title.trim() || !content.trim() || !image.trim() || !tag.trim()) {
			res.status(CONFLICT).json({
				message: "Please provide all the fields"
			})
			return
		}

		const blog = await BlogModel.create({
			title,
			titlePic: image,
			content,
			tag,
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
		const { title, tag, content, image } = updateBlogSchema.parse(req.body)
		const blogId = userIdSchema.parse(req.params.id)
		if (!title?.trim() && !tag?.trim() && !image?.trim() && !content?.trim()) {
			res.status(CONFLICT).json({
				message: "atleast give one field "
			})
			return
		}

		const blog = await BlogModel.findByIdAndUpdate(blogId, {
			title,
			content,
			tag,
			titlePic: image,
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

		if (blog.author.toString() !== req.userId.toString()) {
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
		const blog = await BlogModel.aggregate([
			{
				$addFields: {
					// Count the number of likes (size of the likes array)
					likesCount: { $size: "$likes" },
				},
			},
			{
				$sort: { likesCount: -1 }, // Sort by likesCount in descending order (most likes first)
			},
			{
				$limit: 1, // Limit the result to the top 1 blog with the most likes
			},
		]);
		res.status(OK).json(blog)

	} catch (error) {
		console.log("Error in Getting Popular Blog ", error)
		res.status(INTERNAL_SERVER_ERROR).json({
			message: "Internal server error "
		})
	}
}

export const getAllBlogHandler = async (_: Request, res: Response) => {
	try {
		const blogs = await BlogModel.find()
			.populate({
				path: "author",
				select: "-password",
			})

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

export const uploadImageHandler = async (req: Request, res: Response) => {
	try {
		const { image } = imageSchema.parse(req.body)
		if (!image) {
			res.status(OK).json({
				message: "Please provid an image"
			})
			return
		}
		const CloudinaryResponse = await cloudinary.uploader.upload(image)

		res.status(OK).json(CloudinaryResponse.secure_url)
	} catch (error) {
		console.log("Error in  uploading image ", error)
		res.status(INTERNAL_SERVER_ERROR).json({
			message: "Internal server error "
		})
	}
}

export const getBlogByTagHandler = async (req: Request, res: Response) => {
	try {
		const tag = tagSchema.parse(req.params.tag)

		if (!tag) {
			res.status(CONFLICT).json({
				message: "no tag provided"
			})
			return
		}

		const blogs = await BlogModel.find({
			tag,
		})

		res.status(OK).json(blogs)
	} catch (error) {
		console.log("Error in Getting Blog by Tag", error)
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

		if (!blog.likes.map((id) => id.toString()).includes(req.userId.toString())) {
			await BlogModel.findByIdAndUpdate(blogId, {
				$push: { likes: req.userId },
			});
			blog.likes.push(req.userId);
		} else {
			await BlogModel.findByIdAndUpdate(blogId, {
				$pull: { likes: req.userId },
			});
			blog.likes = blog.likes.filter((like) => like.toString() !== req.userId.toString());
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
			$push: { comment: comment._id }
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

		if (!comment.likes.map((id) => id.toString()).includes(req.userId.toString())) {
			await CommentModel.findByIdAndUpdate(commentId, {
				$push: { likes: req.userId }
			})
			comment.likes.push(req.userId)
		} else {
			await CommentModel.findByIdAndUpdate(commentId, {
				$pull: { likes: req.userId }
			})
			comment.likes = comment.likes.filter((like) => like.toString() !== req.userId.toString())
		}


		res.status(OK).json(comment)

	} catch (error) {
		console.log("Error in liking comment on the blog ", error)
		res.status(INTERNAL_SERVER_ERROR).json({
			message: "Internal server error "
		})
	}
}

export const getUserBlogHandler = async (req: Request, res: Response) => {
	try {
		const username = userIdSchema.parse(req.params.username)
		if (!username) {
			res.status(CONFLICT).json({
				message: "username is not provided"
			})
			return
		}

		const user = await UserModel.findOne({ username })
		if (!user) {
			res.status(NOT_FOUND).json({
				message: "user not found"
			})
			return
		}

		const blogs = await BlogModel.find({
			author: user._id
		})

		res.status(OK).json(blogs)

	} catch (error) {
		console.log("Error in User blogs ", error)
		res.status(INTERNAL_SERVER_ERROR).json({
			message: "Internal server error "
		})
	}
}

