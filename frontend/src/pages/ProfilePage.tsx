import { FullBlogComp } from "@/components/FullBlogComp"
import { ProfilePageSkeleton } from "@/components/skeleton/ProfilePageSkeleton"
import { UpdateProfileDialog } from "@/components/UpdateProfileDialog"
import { useBlogStore } from "@/sotres/blog.store"
import { useUserStore } from "@/sotres/user.store"
import { useEffect } from "react"
import { useParams } from "react-router"


export const ProfilePage = () => {
  const { authUser } = useUserStore()
  const { getUserBlogs, isGettingUserBlogs, blogs } = useBlogStore()
  const { username } = useParams()

  useEffect(() => {
    getUserBlogs(username || "")
  }, [authUser])

  if (isGettingUserBlogs) {
    return (
      <div>
        <ProfilePageSkeleton />
      </div>
    )
  }



  return (
    <div className="mx-auto h-screen max-w-screen-md">

      <div className="bg-secondary/50 flex flex-col items-center justify-center gap-2 rounded-md p-4 mt-4">

        <div
          className=' size-24 rounded-full border-2 border-slate-500/20 transform overflow-hidden  transition-all hover:'
        >
          <img className="w-full h-full object-cover" src={authUser?.profilePic || "/placeholder.png"} />
        </div>

        <p className="font-semibold font-mono text-2xl">{authUser?.username}</p>

        <UpdateProfileDialog />



      </div>

      <div className="bg-secondary/50  flex-col gap-2 rounded-md p-4 mt-4">
        <h1 className="font-bold text-5xl">Blogs</h1>


        {blogs && blogs.map((blog) => (
          <FullBlogComp
            key={blog._id}
            title={blog.title || ""}
            authorId={blog.author?._id || ""}
            tag={blog.tag || ""}
            showDelete={authUser?._id.toString() === blog.author?._id?.toString()}
            titlePic={blog.titlePic || ""}
            createdAt={blog.createdAt || ""}
            authorPic={blog.author?.profilePic || ""}
            content={blog.content || ""}
            _id={blog._id || ""}
            author={blog.author?.username || ""}
            likes={blog.likes || []}
          />
        ))}

      </div>
    </div>
  )
}
