import toast from "react-hot-toast"

type regiParams = {
	username: string,
	email: string,
	password: string,
	confirmPassword: string,
}

export const validateRegisterForm = ({ username, email, password, confirmPassword }: regiParams) => {

	const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
	if (!username.trim()) {
		toast.error("please provide username")
		return false
	} else if (!email.trim()) {
		toast.error("please provide email")
		return false
	} else if (!password.trim()) {
		toast.error("please provide password")
		return false
	} else if (!confirmPassword.trim()) {
		toast.error("please provide confirm Password")
		return false
	} else if (password !== confirmPassword) {
		toast.error("passwords do not match")
		return false
	} else if (!emailRegex.test(email)) {
		toast.error("not a valid email")
		return false
	}
	return true
}

type loginParams = {
	username: string,
	password: string,
}

export const validateLoginForm = ({ username, password }: loginParams) => {
	if (!username.trim()) {
		toast.error("please provide username")
		return false
	} else if (!password.trim()) {
		toast.error("please provide password")
		return false
	}
	return true
}

type sendMailParams = {
	email: string
}

export const validateResetForm = ({ email }: sendMailParams) => {
	const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
	if (!emailRegex.test(email)) {
		toast.error("not a valid email")
		return false
	}
	return true
}

type resetPasswordParams = {
	password: string
	confirmPassword: string
}

export const validateResetPasswordFrom = ({ password, confirmPassword }: resetPasswordParams) => {

	if (!password.trim()) {
		toast.error("please provide a password")
		return false
	} else if (!confirmPassword.trim()) {
		toast.error("please provide a confirm password")
		return false
	} else if (confirmPassword !== password) {
		toast.error("passwords must be same")
		return false
	}
	return true
}

type createBlogParams = {
	title: string,
	content: string,
}

export const validateCreateBlog = ({ title, content }: createBlogParams) => {
	if (!title.trim()) {
		toast.error("please provide a Title")
		return false
	} else if (!content.trim()) {
		toast.error("please provide a content")
		return false
	}
	return true
}
