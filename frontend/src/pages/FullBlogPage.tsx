import { useBlogStore } from "@/sotres/blog.store";
import { useEffect } from "react";
import { useParams } from "react-router"
import DOMPurify from 'dompurify'
import { RiHeartLine } from "@remixicon/react";
import { useUserStore } from "@/sotres/user.store";


export const FullBlogPage = () => {
  const { blogId } = useParams()
  const { getBlog, isGettingBlog, blog } = useBlogStore()
  const { authUser } = useUserStore()

  if (!blog || !authUser) {
    return (
      <div className="h-screen w-full font-semibold flex items-center justify-center">
        Something went wrong try to refresh the page 😊
      </div>
    )
  }

  const htmlContent = DOMPurify.sanitize(blog.content || "")

  if (isGettingBlog) {
  }

  useEffect(() => {
    getBlog(blogId || "")
  }, [])

  return (
    <div className="mt-8 mx-2 ">

      <h1 className="text-4xl font-bold  mx-2">
        {blog.title}
      </h1>
      <p className="font-semibold mx-6">
        {blog.author?.username}
      </p>


      <div className="tiptap mt-4"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <div className="border-t-2 mt-4 py-2 px-4 ">
        {blog.comment?.map((cmt) => (
          <div>
            <div>
              <div>{cmt.author} </div>
              <div> {cmt.content} </div>
            </div>
            <div>
              <button
                className={`flex flex-col ${cmt.likes?.includes(authUser?._id) ? "text-red-500" : "text-slate-500/60"} `} >
                <RiHeartLine />
                {cmt.likes?.length}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
