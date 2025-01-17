import { create } from "zustand";
import { commentParams, createParams, IBlog, updateParams, uploadParams } from "./blog.schema";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";


interface BlogState {
	blog: IBlog | null,
	blogs: IBlog[] | null,
	createBlog: (formData: createParams) => Promise<void>,
	updateBlog: (id: string, formData: updateParams) => Promise<void>,
	deleteBlog: (id: string) => Promise<void>,
	getAllBlogs: () => Promise<void>,
	getUserBlogs: (id: string) => Promise<void>,
	uploadImage: (formData: uploadParams) => Promise<string>,
	getBlog: (id: string) => Promise<void>,
	likeBlog: (id: string) => Promise<void>,
	likeComment: (id: string) => Promise<void>,
	comment: (id: string, formData: commentParams) => Promise<void>,
	isCreating: boolean,
	isUpdating: boolean,
	isDeleting: boolean,
	isGettingAllBlogs: boolean,
	isGettingBlog: boolean,
	isLikingBlog: boolean,
	isLikingComment: boolean,
	isCommenting: boolean,
	isGettingUserBlogs: boolean,
}

export const useBlogStore = create<BlogState>((set) => ({
	blog: null,
	blogs: null,
	isCreating: false,
	isUpdating: false,
	isDeleting: false,
	isGettingAllBlogs: false,
	isGettingBlog: false,
	isLikingBlog: false,
	isLikingComment: false,
	isCommenting: false,
	isGettingUserBlogs: false,

	createBlog: async (formData: createParams) => {
		set({ isCreating: true })
		try {
			const res = await axiosInstance.post(`/blog/create`, formData)
			set({ blogs: res.data })
			return res.data
		} catch (error) {
			const errorMessage = error instanceof AxiosError && error.response?.data.message || "Something went Wrong"
			set({ blogs: null })
			toast.error(errorMessage);
			throw new Error(errorMessage)
		} finally {
			set({ isCreating: false })
		}
	},

	updateBlog: async (id: string, formData: updateParams) => {
		set({ isUpdating: true })
		try {
			const res = await axiosInstance.put(`/blog/update/${id}`, formData)
			set({ blog: res.data })
		} catch (error) {
			error instanceof AxiosError && toast.error(error.response?.data.message || "Something went Wrong");
			set({ blog: null })
		} finally {
			set({ isUpdating: false })
		}
	},

	deleteBlog: async (id: string) => {
		set({ isDeleting: true })
		try {
			await axiosInstance.delete(`/blog/${id}`)
			set((state) => ({
				blogs: state.blogs?.filter(b => b._id !== id)
			}))
		} catch (error) {
			error instanceof AxiosError && toast.error(error.response?.data.message || "Something went Wrong");
			set({ blogs: null })
		} finally {
			set({ isDeleting: false })
		}
	},

	getAllBlogs: async () => {
		set({ isGettingAllBlogs: true })
		try {
			const res = await axiosInstance.get('/blog/')
			set({ blogs: res.data })
		} catch (error) {
			error instanceof AxiosError && toast.error(error.response?.data.message || "Something went Wrong");
			set({ blogs: null })
		} finally {
			set({ isGettingAllBlogs: false })
		}
	},

	getUserBlogs: async (id: string) => {
		set({ isGettingUserBlogs: true })
		try {
			const res = await axiosInstance.get(`/blog/user/${id}`)
			set({ blogs: res.data })
		} catch (error) {
			error instanceof AxiosError && toast.error(error.response?.data.message || "Something went Wrong");
			set({ blogs: null })
		} finally {
			set({ isGettingUserBlogs: false })
		}
	},

	uploadImage: async (formData: uploadParams) => {
		try {
			const res = await axiosInstance.post(`/blog/upload`, formData)
			return res.data
		} catch (error) {
			const errorMessage = error instanceof AxiosError && error.response?.data.message || "Something went Wrong"
			toast.error(errorMessage);
			throw new Error(errorMessage)
		}
	},

	getBlog: async (id: string) => {
		set({ isGettingBlog: true })
		try {
			const res = await axiosInstance.get(`/blog/${id}`)
			set({ blog: res.data })
		} catch (error) {
			error instanceof AxiosError && toast.error(error.response?.data.message || "Something went Wrong");
			set({ blog: null })
		} finally {
			set({ isGettingBlog: false })
		}
	},

	likeBlog: async (id: string) => {
		set({ isLikingBlog: true })
		try {
			const res = await axiosInstance.get<IBlog>(`/blog/like/${id}`)
			set((state) => ({
				blog: {
					...state.blog,
					likes: res.data.likes,
				}
			}))
			set((state) => ({
				blogs: state.blogs?.map((b) =>
					b._id === id ? { ...b, likes: res.data.likes } : b
				),
			}))
		} catch (error) {
			error instanceof AxiosError && toast.error(error.response?.data.message || "Something went Wrong");
			set({ blog: null })
		} finally {
			set({ isLikingBlog: false })
		}
	},

	likeComment: async (id: string) => {
		set({ isLikingComment: true })
		try {
			const res = await axiosInstance.get<IBlog>(`/blog/comment/like/${id}`)
			set((state) => ({
				blog: {
					...state.blog,
					comment: state.blog?.comment?.map((cmt) =>
						cmt._id === id ?
							{ ...cmt, likes: res.data.likes } : cmt
					),
				}
			}))
		} catch (error) {
			error instanceof AxiosError && toast.error(error.response?.data.message || "Something went Wrong");
			set({ blog: null })
		} finally {
			set({ isLikingComment: false })
		}
	},

	comment: async (id: string, formData: commentParams) => {
		set({ isCommenting: true })
		try {
			const res = await axiosInstance.post(`/blog/comment/${id}`, formData)
			set({ blog: res.data })
		} catch (error) {
			error instanceof AxiosError && toast.error(error.response?.data.message || "Something went Wrong");
			set({ blog: null })
		} finally {
			set({ isCommenting: false })
		}
	},

}))
