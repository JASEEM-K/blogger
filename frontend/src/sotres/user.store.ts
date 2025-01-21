import { create } from 'zustand'

import { IUser, loginParams, registerParams, resetParams, sendCodeParams, updateUser, } from './user.schema'
import { axiosInstance } from '../lib/axios'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'


interface UserState {
	authUser: IUser | null,
	user: IUser | null,
	register: (formData: registerParams) => Promise<void>,
	login: (formData: loginParams) => Promise<void>,
	updateUser: (formData: updateUser) => Promise<void>,
	authCheck: () => Promise<void>,
	logout: () => Promise<void>,
	verifyEmail: (code: string) => Promise<void>,
	sendResetPassword: (formData: sendCodeParams) => Promise<void>,
	resetPassword: (code: string, formData: resetParams) => Promise<void>,
	getUser: (id: string) => Promise<void>,
	isRegistering: boolean,
	isLogining: boolean,
	isUpdating: boolean,
	isLoginout: boolean,
	isCheckingAuth: boolean,
	isVerifyingEmail: boolean,
	isSendingCode: boolean,
	isResetingPassword: boolean,
	isGettingUser: boolean,
}

export const useUserStore = create<UserState>((set) => ({
	authUser: null,
	user: null,
	isRegistering: false,
	isLogining: false,
	isLoginout: false,
	isUpdating: false,
	isCheckingAuth: false,
	isVerifyingEmail: false,
	isSendingCode: false,
	isResetingPassword: false,
	isGettingUser: false,

	register: async (formData: registerParams) => {
		set({ isRegistering: true })
		try {
			const res = await axiosInstance.post("/auth/register", formData)
			set({ authUser: res.data })
		} catch (error) {
			error instanceof AxiosError && toast.error(error.response?.data.message || "Something went Wrong");
			set({ authUser: null })
		} finally {
			set({ isRegistering: false })
		}
	},

	login: async (formData: loginParams) => {
		set({ isLogining: true })
		try {
			const res = await axiosInstance.post("/auth/login", formData)
			set({ authUser: res.data })
		} catch (error) {
			error instanceof AxiosError && toast.error(error.response?.data.message || "Something went Wrong");
			set({ authUser: null })
		} finally {
			set({ isLogining: false })
		}
	},

	updateUser: async (formData: updateUser) => {
		set({ isUpdating: true })
		try {
			const res = await axiosInstance.put("/user/update", formData)
			set({ authUser: res.data })
		} catch (error) {
			error instanceof AxiosError && toast.error(error.response?.data.message || "Something went Wrong");
			set({ authUser: null })
		} finally {
			set({ isUpdating: false })
		}
	},

	authCheck: async () => {
		set({ isGettingUser: true })
		try {
			const res = await axiosInstance.get("user/")
			set({ authUser: res.data })
		} catch (error) {
			error instanceof AxiosError && toast.error(error.response?.data.message || "Something went Wrong");
			set({ authUser: null })
		} finally {
			set({ isGettingUser: false })
		}
	},

	logout: async () => {
		set({ isLoginout: true })
		try {
			await axiosInstance.get("/auth/logout")
			set({ authUser: null })
		} catch (error) {
			error instanceof AxiosError && toast.error(error.response?.data.message || "Something went Wrong");
			set({ authUser: null })
		} finally {
			set({ isLoginout: false })
		}
	},

	verifyEmail: async (code: string) => {
		set({ isVerifyingEmail: true })
		try {
			const res = await axiosInstance.get(`/auth/email/verify/${code}`)
			set({ authUser: res.data })
		} catch (error) {
			error instanceof AxiosError && toast.error(error.response?.data.message || "Something went Wrong");
			set({ authUser: null })
		} finally {
			set({ isVerifyingEmail: false })
		}
	},

	sendResetPassword: async (formData: sendCodeParams) => {
		set({ isSendingCode: true })
		try {
			await axiosInstance.post(`/auth/forgot`, formData)
			toast.success("reset code send to mail")
		} catch (error) {
			error instanceof AxiosError && toast.error(error.response?.data.message || "Something went Wrong");
			set({ authUser: null })
		} finally {
			set({ isSendingCode: false })
		}
	},

	resetPassword: async (code: string, formData: resetParams) => {
		set({ isResetingPassword: true })
		try {
			const res = await axiosInstance.post(`/auth/forgot/reset/${code}`, formData)
			set({ authUser: res.data })
		} catch (error) {
			error instanceof AxiosError && toast.error(error.response?.data.message || "Something went Wrong");
			set({ authUser: null })
		} finally {
			set({ isResetingPassword: false })
		}
	},

	getUser: async (id: string) => {
		set({ isGettingUser: true })
		try {
			const res = await axiosInstance.get(`/user/${id}`)
			set({ authUser: res.data })
		} catch (error) {
			error instanceof AxiosError && toast.error(error.response?.data.message || "Something went Wrong");
			set({ authUser: null })
		} finally {
			set({ isGettingUser: false })
		}
	},

}))
