import { BlogComponent } from "@/components/blogComponent"
import { HomePageSkeleton } from "@/components/skeleton/HomePageSkeleton"
import { useBlogStore } from "@/sotres/blog.store"
import { useEffect } from "react"


export const HomePage = () => {

  const { blogs, getAllBlogs, isGettingAllBlogs } = useBlogStore()

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

      {blogs && blogs.map((blog) => (
        <BlogComponent
          key={blog._id}
          likes={blog.likes}
          _id={blog._id}
          comment={blog.comment}
          title={blog.title}
          author={blog.author}
        />
      ))}
    </div>
  )
}
