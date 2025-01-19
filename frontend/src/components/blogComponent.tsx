import { IBlog } from '@/sotres/blog.schema'
import { useBlogStore } from '@/sotres/blog.store'
import { useUserStore } from '@/sotres/user.store'
import { RiChat1Line, RiHeartLine } from '@remixicon/react'
import { } from 'react'
import { Link } from 'react-router'
import { DeleteDialog } from './deleteDialog'

export const BlogComponent = ({ title, _id, author, likes, comment }: IBlog) => {
  const { likeBlog, isLikingBlog } = useBlogStore()
  const { authUser } = useUserStore()

  if (!authUser || !likes || !comment) {
    return (
      <div className='h-screen w-screen flex items-center justify-center'>
        Something went wrong, Please try to refresh the Page.
      </div>
    )
  }


  return (
    <div className=' shadow max-w-screen-sm rounded-md bg-secondary border-2 '>

      <div className='px-2 py-2 '>
        <div className=' flex justify-between'>

          <div className="flex font-semibold items-center mt-2 w-fit font-mono gap-2 mx-6">
            <div
              className=' size-6 rounded-full transform overflow-hidden  transition-all hover:'
            >
              <img src={authUser?.profilePic || "/placeholder.png"} />
            </div>
            <p className="">
              {author?.username}
            </p>
          </div>

          {authUser._id.toString() === author?._id?.toString() && <DeleteDialog id={_id || ""} />}

        </div>
        <Link
          to={`/blog/${_id}`}
        >
          <div className='text-3xl font-bold'>
            {title}
          </div>
        </Link>
      </div>

      <div className='flex px-4 gap-4 text-primary/30 border-t-2 py-2'>
        <button
          disabled={isLikingBlog}
          onClick={() => likeBlog(_id || "")}
          className={`${likes.includes(authUser?._id) ? "text-red-500" : ""}  flex gap-1 hover:text-red-500 items-center`}
        >
          <RiHeartLine />
          <p>{likes.length}</p>
        </button>

        <div className=' flex  items-center'>
          <RiChat1Line />
          {comment.length}
        </div>
      </div>
    </div >
  )
}
