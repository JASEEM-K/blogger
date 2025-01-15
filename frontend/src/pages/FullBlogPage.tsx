import { useBlogStore } from "@/sotres/blog.store";
import { useEffect } from "react";
import { useParams } from "react-router"
import DOMPurify from 'dompurify'


export const FullBlogPage = () => {
  const { blogId } = useParams()
  const { getBlog, isGettingBlog } = useBlogStore()
  console.log(blogId);

  const blog = {
    title: "this is a temp blog",
    content: `<p>This is a basic example of implementing images. Drag to re-order.</p> <img src="https://placehold.co/600x400" /><img src="https://placehold.co/800x400" />`,
    author: {
      username: "jesse"
    },

  }
  const htmlContent = DOMPurify.sanitize(blog.content)

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
        {blog.author.username}
      </p>


      <div className="tiptap mt-4"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <div className="border-t-2 mt-4 py-2 px-4 ">
      </div>

    </div>
  )
}
