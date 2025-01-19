import { FullBlogComp } from "@/components/FullBlogComp"
import { FullBlogCardSkeleton } from "@/components/skeleton/FullBlogCardSkeleton"
import { useBlogStore } from "@/sotres/blog.store"
import { useUserStore } from "@/sotres/user.store"
import { useEffect } from "react"
import { useParams } from "react-router"


export const TagBlogPage = () => {
  const { tag } = useParams()
  const { getTagBlog, isGettingBlog, blogs } = useBlogStore()
  const { authUser } = useUserStore()

  useEffect(() => {
    getTagBlog(tag || "")
  }, [])

  if (true) {
    return (
      <div>
        <FullBlogCardSkeleton />
      </div>
    )
  }

  return (
    <div className="mx-auto my-5 space-y-3 max-w-screen-sm">

      <h1 className="font-bold text-3xl ">
        {tag?.toUpperCase()} Taged Blogs
      </h1>

      <div>
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
