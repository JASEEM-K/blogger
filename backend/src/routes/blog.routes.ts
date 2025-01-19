import { Router } from "express";
import { authenticated } from "../middleware/authenticated";
import { commentHandler, createBlogHandler, deleteBlogHandler, getAllBlogHandler, getBlogByTagHandler, getBlogHandler, getUserBlogHandler, toggleLikeCommentHandle, toggleLikeHandler, updateBlogHandler, uploadImageHandler } from "../controllers/blog.controller";

const blogRouter = Router()

blogRouter.post("/create", authenticated, createBlogHandler)

blogRouter.put("/update/:id", authenticated, updateBlogHandler)

blogRouter.delete("/:id", authenticated, deleteBlogHandler)

blogRouter.get("/", authenticated, getAllBlogHandler)

blogRouter.post("/upload", authenticated, uploadImageHandler)

blogRouter.get("/:id", getBlogHandler)

blogRouter.get("/tag/:tag", getBlogByTagHandler)

blogRouter.get("/user/:username", authenticated, getUserBlogHandler)

blogRouter.get("/like/:id", authenticated, toggleLikeHandler)

blogRouter.get("/comment/like/:id", authenticated, toggleLikeCommentHandle)

blogRouter.post("/comment/:id", authenticated, commentHandler)

export default blogRouter
