import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import { APP_ORIGIN, PORT } from './constants/env'
import { connectDB } from './config/db'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({
	extended: true
}))
app.use(cors({
	origin: APP_ORIGIN,
	credentials: true,
}))




app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	connectDB()
})
