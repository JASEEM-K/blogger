import { Router } from "express";
import { authCheckHandler, getUserHandler } from "../controllers/user.controller";
import { authenticated } from "../middleware/authenticated";

const userRouter = Router()

userRouter.get("/", authenticated, authCheckHandler)

userRouter.get("/:id", authenticated, getUserHandler)

export default userRouter
