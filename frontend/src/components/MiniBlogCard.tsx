import { getDateNumeric } from '@/lib/date'
import { useBlogStore } from '@/sotres/blog.store'
import { RiHeartLine } from '@remixicon/react'
import DOMPurify from 'dompurify'
import { Link } from 'react-router'

interface Props {
  _id: string,
  content: string,
  tag: string,
  author: string,
  authorPic: string,
  authorId: string,
  createdAt: string,
  titlePic: string,
  title: string,
  likes: string[],
  comment: number,
}

export const MiniBlogCard = ({ _id, authorId, comment, likes, content, tag, title, author, createdAt, titlePic, authorPic }: Props) => {
  const { isLikingBlog, likeBlog } = useBlogStore()

  const htmlContent = DOMPurify.sanitize(content || "")


  return (
    <div className='grid grid-rows-2 gap-3 mt-4 h-96'>

      <div className='overflow-hidden rounded-md flex items-center  bg-secondary'>
        <img className='w-full h-full object-cover' src={titlePic || "/placeholder-800x400.jpeg"} />
      </div>

      <div className='' >
        <div className='flex justify-between'>
          <div className="flex font-semibold  items-center  font-mono gap-2 ">
            <div
              className='size-8 transform bg-primary border-2 rounded-full overflow-hidden transition-all hover:'
            >
              <img
                className='w-full h-full object-cover '
                src={authorPic || "/placeholder.png"} />
            </div>
            <p className="">
              {author}
            </p>

            <p className='font-bold text-lg'>
              -
            </p>

            <p className='font-semibold font-mono text-sm '>
              {getDateNumeric(createdAt)}
            </p>
          </div>

          <button
            disabled={isLikingBlog}
            onClick={() => likeBlog(_id || "")}
            className={`${likes.includes(authorId) ? "text-red-500" : ""}  flex  gap-1 hover:text-red-500 items-center`}
          >
            <RiHeartLine />
          </button>
        </div>


        <Link
          to={`/blog/${_id}`}
        >
          <h1 className='font-bold text-2xl ml-2 mt-1.5'>{title}</h1>
        </Link>


        <div className="tiptap  h-20 overflow-hidden "
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <div className='font-bold ml-2 font-mono  align-bottom text-blue-500'>

          <Link
            to={`/tag/${tag}`}
          >
            {tag}
          </Link>

        </div>
      </div>

    </div >
  )
}
