import { useBlogStore } from "@/sotres/blog.store";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import DOMPurify from 'dompurify'
import { RiHeartLine } from "@remixicon/react";
import { useUserStore } from "@/sotres/user.store";
import toast from "react-hot-toast";
import { validateCommentForm } from "@/lib/formValidation";
import { getDate } from "@/lib/date";
import { FullBlogSkeleton } from "@/components/skeleton/fullBlogSkeleton";


export const FullBlogPage = () => {
  const { blogId } = useParams()
  const { getBlog, isGettingBlog, blog, likeComment, isLikingComment, comment, isCommenting } = useBlogStore()
  const { authUser } = useUserStore()
  const [formData, setFormData] = useState({
    content: "",
  })
  if (!blogId) {
    toast.error("check the params ")
    return
  }

  useEffect(() => {
    getBlog(blogId)
  }, [])


  if (isGettingBlog) {
    return (
      <FullBlogSkeleton />
    )
  }

  const handleSubmition = () => {
    if (!authUser) {
      toast.error("login to comment on post")
      return
    }
    if (validateCommentForm(formData))
      toast.promise(comment(blog?._id || "", formData), {
        loading: "commenting",
        success: "Comment posted",
        error: "something went wrong",
      })
    getBlog(blogId)
    setFormData({
      content: ""
    })
  }

  if (!blog) {
    return (
      <div className="h-screen w-full font-semibold flex items-center justify-center">
        Something went wrong try to refresh the page 😊
      </div>
    )
  }

  const htmlContent = DOMPurify.sanitize(blog.content || "")
  return (
    <div className="mt-8 mx-auto max-w-screen-md ">

      <h1 className="text-4xl font-bold  mx-2">
        {blog.title}
      </h1>
      <div className="flex font-semibold items-center mt-2 font-mono gap-2 mx-6">
        <div
          className=' size-6 rounded-full transform overflow-hidden  transition-all hover:'
        >
          <img src={authUser?.profilePic || "/placeholder.png"} />
        </div>
        <p className="">
          {blog.author?.username}
        </p>
      </div>
      <p className="font-semibold mx-6">
        Date:&nbsp;{getDate(blog?.createdAt || "")}
      </p>


      <div className="tiptap mt-4"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <div className="border-t-2  mt-4 py-2 px-4">

        <div className="flex justify-between px-5 gap-2 ">
          <input
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="h-10 w-full bg-transparent px-4 border-2 outline-none focus:border-blue-500 rounded-md"
            placeholder="Comment somthing"
          />
          <button
            className='flex justify-center items-center font-semibold bg-blue-500 rounded-md border-2 h-10 w-fit px-4 border-blue-500 text-white hover:bg-transparent hover:text-blue-500 disabled:cursor-not-allowed  '
            disabled={isCommenting}
            onClick={handleSubmition}
          >
            POST
          </button>
        </div>

        {blog.comment?.map((cmt) => (
          <div
            className=" flex justify-between items-center border-b px-4 pb-1 mb-2"
            key={cmt._id}
          >
            <div >
              <div className="font-mono text-primary/60">{cmt.author?.username} </div>
              <div className="font-semibold font-mono"> {cmt.content} </div>
            </div>
            <div>
              <button
                onClick={() => likeComment(cmt._id || "")}
                disabled={isLikingComment}
                className={`flex items-center gap-0.5 hover:text-red-400 ${cmt.likes?.includes(authUser?._id || "") ? "text-red-500" : "text-slate-500/60"} `} >
                <RiHeartLine />
                <p className="-translate-y-0.5">{cmt.likes?.length}</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
