import { Router } from "express";
import { authCheckHandler, getUserHandler, updateUserHandler } from "../controllers/user.controller";
import { authenticated } from "../middleware/authenticated";

const userRouter = Router()

userRouter.get("/", authenticated, authCheckHandler)

userRouter.get("/:id", authenticated, getUserHandler)

userRouter.put("/update", authenticated, updateUserHandler)

export default userRouter
