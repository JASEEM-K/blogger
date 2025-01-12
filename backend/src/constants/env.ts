const getEnv = (name: string) => {

	const value = process.env[name]

	if (!value) {
		throw new Error(`Missing the Env property ${value}`)
	}

	return value
}

export const PORT = getEnv("PORT")
export const APP_ORIGIN = getEnv("APP_ORIGIN")
export const MONGO_URI = getEnv("APP_ORIGIN")
export const JWT_SECRET = getEnv("JWT_SECRET")
export const NODE_ENV = getEnv("NODE_ENV")
