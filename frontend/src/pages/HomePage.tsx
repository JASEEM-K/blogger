import { FullBlogComp } from "@/components/FullBlogComp"
import { MiniBlogCard } from "@/components/MiniBlogCard"
import { HomePageSkeleton } from "@/components/skeleton/HomePageSkeleton"
import { useBlogStore } from "@/sotres/blog.store"
import { useUserStore } from "@/sotres/user.store"
import { useEffect } from "react"


export const HomePage = () => {

  const { blogs, getAllBlogs, getPopularBlog, blog, isGettingBlog, isGettingAllBlogs } = useBlogStore()
  const { authUser } = useUserStore()

  useEffect(() => {
    getAllBlogs()
    getPopularBlog()
  }, [])

  if (isGettingAllBlogs || isGettingBlog) {
    return (
      <HomePageSkeleton />
    )
  }


  if (!blog) {
    return (
      <div className="w-screen h-screen mb-16 flex justify-center items-center">
        <p className="font-semibold">Please refresh the page 😞</p>
      </div>
    )
  }


  return (
    <div className="mx-auto my-5 space-y-3 max-w-screen-sm">

      <div className="w-full bg-secondary h-fit rounded-md p-4 flex flex-col items-center my-5 ">
        <p className="font-mono">Welcome to Blogger </p>
        <p>Craft and narratives ✍️ that ignite <span className="text-red-400" > inspiration </span> 💡,</p>
        <p><span className="text-red-400" >Knowledge </span> 📙, and <span className="text-red-400" >entertainment</span> 🎬</p>
      </div>

      <FullBlogComp
        title={blog.title || ""}
        tag={blog.tag || ""}
        showDelete={false}
        authorId={blog.author?._id || ""}
        titlePic={blog.titlePic || ""}
        createdAt={blog.createdAt || ""}
        authorPic={blog.author?.profilePic || ""}
        content={blog.content || ""}
        _id={blog._id || ""}
        author={blog.author?.username || ""}
        likes={blog.likes || []}
      />

      <div className="grid gap-4  grid-cols-1 sm:grid-cols-3">
        {blogs && blogs.map((b) => (
          <MiniBlogCard
            key={b._id}
            title={b.title || ""}
            tag={b.tag || ""}
            authorId={authUser?._id || ""}
            titlePic={b.titlePic || ""}
            createdAt={b.createdAt || ""}
            authorPic={b.author?.profilePic || ""}
            content={b.content || ""}
            _id={b._id || ""}
            author={b.author?.username || ""}
            likes={b.likes || []}
          />
        ))}

      </div>
    </div>
  )
}
