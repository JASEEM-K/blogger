import { Router } from "express";
import { loginHandler, logoutHandler, registerHandler, resetPasswordHandler, sendResetPasswordHandler, verifyEmailHandler } from "../controllers/auth.controller";
import { authenticated } from "../middleware/authenticated";


const authRouter = Router()

authRouter.post("/register", registerHandler)

authRouter.post("/login", loginHandler)

authRouter.get("/logout", authenticated, logoutHandler)


authRouter.get("/email/verify/:code", authenticated, verifyEmailHandler)

authRouter.get("/forgot", authenticated, sendResetPasswordHandler)

authRouter.get("/forgot/reset/:code", authenticated, resetPasswordHandler)


export default authRouter
