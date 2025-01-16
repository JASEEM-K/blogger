import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { v2 as cloudinary } from 'cloudinary'

import { APP_ORIGIN, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME, PORT } from './constants/env'
import { connectDB } from './config/db'

import authRouter from './routes/auth.routes'
import userRouter from './routes/user.routes'
import blogRouter from './routes/blog.routes'

const app = express()
cloudinary.config({
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_API_SECRET,
	cloud_name: CLOUDINARY_NAME,
})

app.use(express.json({
	limit: "5mb",
}))
app.use(cookieParser())
app.use(express.urlencoded({
	extended: true,
}))
app.use(cors({
	origin: APP_ORIGIN,
	credentials: true,
}))


app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/blog", blogRouter)



app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectDB()
})
