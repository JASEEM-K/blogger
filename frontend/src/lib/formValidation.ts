import toast from "react-hot-toast"

type regiParams = {
	username: string,
	email: string,
	password: string,
	confirmPassword: string,
}

export const validateRegisterForm = ({ username, email, password, confirmPassword }: regiParams) => {

	if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
		toast.error("please provide all the fields")
	}

	if (password === confirmPassword) {
		toast.error("passwords do not match")
	}
	const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
	if (!emailRegex.test(email)) {
		toast.error("not a valid email")
	}

}

type loginParams = {
	username: string,
	password: string,
}

export const validateLoginForm = ({ username, password }: loginParams) => {

	if (!username.trim() || !password.trim()) {
		toast.error("please provide all the fields")
	}
}
