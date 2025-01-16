const getEnv = (name: string) => {

	const value = process.env[name]

	if (!value) {
		throw new Error(`Missing the Env property ${value}`)
	}

	return value
}

export const PORT = getEnv("PORT")
export const APP_ORIGIN = getEnv("APP_ORIGIN")
export const MONGO_URI = getEnv("MONGO_URI")
export const JWT_SECRET = getEnv("JWT_SECRET")
export const NODE_ENV = getEnv("NODE_ENV")
export const RESEND_API = getEnv("RESEND_API")
export const FROM_EMAIL = getEnv("FROM_EMAIL")

