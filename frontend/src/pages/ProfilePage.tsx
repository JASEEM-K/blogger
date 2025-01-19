import { FullBlogComp } from "@/components/FullBlogComp"
import { MiniBlogCard } from "@/components/MiniBlogCard"
import { useBlogStore } from "@/sotres/blog.store"
import { useUserStore } from "@/sotres/user.store"
import { useEffect } from "react"
import { useParams } from "react-router"


export const ProfilePage = () => {
  const { updateUser, isUpdating, authUser } = useUserStore()
  const { getUserBlogs, isGettingUserBlogs, blogs } = useBlogStore()
  const { username } = useParams()

  useEffect(() => {
    getUserBlogs(username || "")
  }, [])


  return (
    <div className="mx-auto h-screen max-w-screen-md">

      <div className="bg-secondary/50 flex flex-col items-center justify-center gap-2 rounded-md p-4 mt-4">
        <div
          className=' size-24 rounded-full border-2 border-slate-500/20 transform overflow-hidden  transition-all hover:'
        >
          <img src={authUser?.profilePic || "/placeholder.png"} />
        </div>
        <p className="font-semibold font-mono text-2xl">{authUser?.username}</p>
      </div>

      <div className="bg-secondary/50 flex-col gap-2 rounded-md p-4 mt-4">
        <h1 className="font-bold text-5xl">Blogs</h1>

        <div className="grid gap-4 grid-cols-3">
          <MiniBlogCard
            title="Testing full blog comp"
            tag="tech"
            showDelete={true}
            titlePic="https://placehold.co/600x400/EEE/31343C"
            createdAt="2025-01-14T34"
            authorPic="https://placehold.co/600x400/EEE/31343C"
            content="<p> wel this is an example for how this will looks like nothing more nothing less, and also i need to check this thing that is how much of content can this handle i would not understand this at all . Wow prefect this right</p>"
            _id="324234"
            author="Jessem"
            likes={10}
            comment={5}
          />

          <MiniBlogCard
            title="Testing full blog comp"
            tag="tech"
            showDelete={true}
            titlePic="https://placehold.co/600x400/EEE/31343C"
            createdAt="2025-01-14T34"
            authorPic="https://placehold.co/600x400/EEE/31343C"
            content="<p> wel this is an example for how this will looks like nothing more nothing less, and also i need to check this thing that is how much of content can this handle i would not understand this at all . Wow prefect this right</p>"
            _id="324234"
            author="Jessem"
            likes={10}
            comment={5}
          />
        </div>
        {blogs && blogs.map((blog) => (
          <FullBlogComp
            title={blog.title || ""}
            tag={blog.tag || ""}
            showDelete={authUser?._id.toString() === blog.author?._id?.toString()}
            titlePic={blog.titlePic || ""}
            createdAt={blog.createdAt || ""}
            authorPic={blog.author?.profilePic || ""}
            content={blog.content || ""}
            _id={blog._id || ""}
            author={blog.author?.username || ""}
            likes={blog.likes?.length || 0}
            comment={blog.comment?.length || 0}
          />
        ))}
      </div>

    </div>
  )
}
