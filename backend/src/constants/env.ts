function getEnv(name: string) {
	const value = process.env[name]

	if (value === undefined) {
		throw new Error(`Missing the Env property ${name}`)
	}
	return value
}

export const APP_ORIGIN = getEnv("APP_ORIGIN")
export const MONGO_URI = getEnv("MONGO_URI")
export const JWT_SECRET = getEnv("JWT_SECRET")
export const NODE_ENV = getEnv("NODE_ENV")
export const RESEND_API = getEnv("RESEND_API")
export const FROM_EMAIL = getEnv("FROM_EMAIL")
export const CLOUDINARY_API_KEY = getEnv("CLOUDINARY_API_KEY")
export const CLOUDINARY_API_SECRET = getEnv("CLOUDINARY_API_SECRET")
export const CLOUDINARY_NAME = getEnv("CLOUDINARY_NAME")
export const PORT = getEnv("PORT")


