import { Router } from "express";
import { authenticated } from "../middleware/authenticated";
import { commentHandler, createBlogHandler, deleteBlogHandler, getAllBlogHandler, getBlogHandler, getUserBlogHandler, toggleLikeCommentHandle, toggleLikeHandler, updateBlogHandler, uploadImageHandler } from "../controllers/blog.controller";

const blogRouter = Router()

blogRouter.post("/create", authenticated, createBlogHandler)

blogRouter.put("/update/:id", authenticated, updateBlogHandler)

blogRouter.delete("/:id", authenticated, deleteBlogHandler)

blogRouter.get("/", authenticated, getAllBlogHandler)

blogRouter.get("/upload", authenticated, uploadImageHandler)

blogRouter.get("/:id", authenticated, getBlogHandler)

blogRouter.get("/user/:id", authenticated, getUserBlogHandler)

blogRouter.get("/like/:id", authenticated, toggleLikeHandler)

blogRouter.get("/comment/like/:id", authenticated, toggleLikeCommentHandle)

blogRouter.post("/comment/:id", authenticated, commentHandler)

export default blogRouter
