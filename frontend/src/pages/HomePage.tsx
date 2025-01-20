import { MiniBlogCard } from "@/components/MiniBlogCard"
import { HomePageSkeleton } from "@/components/skeleton/HomePageSkeleton"
import { useBlogStore } from "@/sotres/blog.store"
import { useUserStore } from "@/sotres/user.store"
import { useEffect } from "react"


export const HomePage = () => {

  const { blogs, getAllBlogs, isGettingAllBlogs } = useBlogStore()
  const { authUser } = useUserStore()

  useEffect(() => {
    getAllBlogs()
  }, [])

  if (isGettingAllBlogs) {
    return (
      <HomePageSkeleton />
    )
  }

  return (
    <div className="mx-auto my-5 space-y-3 max-w-screen-sm">

      <div className="w-full h-40 rounded-md p-4 flex flex-col items-center my-5 ">
        <p className="font-mono">Welcome to Blogger </p>
        <p>Craft and narratives ✍️ that ignite <span className="text-red-400" > inspiration </span> 💡,</p>
        <p><span className="text-red-400" >Knowledge </span> 📙, and <span className="text-red-400" >entertainment</span> 🎬</p>

      </div>

      <div className="grid gap-4  grid-cols-1 sm:grid-cols-3">
        {blogs && blogs.map((blog) => (
          <MiniBlogCard
            title={blog.title || ""}
            tag={blog.tag || ""}
            authorId={authUser?._id || ""}
            titlePic={blog.titlePic || ""}
            createdAt={blog.createdAt || ""}
            authorPic={blog.author?.profilePic || ""}
            content={blog.content || ""}
            _id={blog._id || ""}
            author={blog.author?.username || ""}
            likes={blog.likes || []}
            comment={blog.comment?.length || 0}
          />
        ))}

      </div>
    </div>
  )
}
