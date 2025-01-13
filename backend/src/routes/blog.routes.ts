import { Router } from "express";
import { authenticated } from "../middleware/authenticated";
import { commentHandler, createBlogHandler, deleteBlogHandler, getAllBlogHandler, getBlogHandler, toggleLikeCommentHandle, toggleLikeHandler, updateBlogHandler } from "../controllers/blog.controller";

const blogRouter = Router()

blogRouter.post("/create", authenticated, createBlogHandler)

blogRouter.put("/:id", authenticated, updateBlogHandler)

blogRouter.delete("/:id", authenticated, deleteBlogHandler)

blogRouter.get("/", authenticated, getAllBlogHandler)

blogRouter.get("/:id", authenticated, getBlogHandler)

blogRouter.get("/like/:id", authenticated, toggleLikeHandler)

blogRouter.get("/comment/like/:id", authenticated, toggleLikeCommentHandle)

blogRouter.get("/comment/:id", authenticated, commentHandler)

export default blogRouter
