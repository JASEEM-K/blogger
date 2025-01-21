import { getDate } from '@/lib/date'
import DOMPurify from 'dompurify'
import { DeleteDialog } from './deleteDialog'
import { Link } from 'react-router';
import { RiHeartLine } from '@remixicon/react';
import { useBlogStore } from '@/sotres/blog.store';

interface Props {
  _id: string,
  content: string,
  tag: string,
  author: string,
  showDelete: boolean;
  authorPic: string,
  createdAt: string,
  titlePic: string,
  authorId: string,
  title: string,
  likes: string[],
}

export const FullBlogComp = ({ _id, authorId, showDelete, likes, content, tag, title, author, createdAt, titlePic, authorPic }: Props) => {
  const { likeBlog, isLikingBlog } = useBlogStore()

  const htmlContent = DOMPurify.sanitize(content || "")

  return (
    <div className='grid sm:grid-cols-2 gap-3 mt-4'>

      <div className='overflow-hidden rounded-md max-h-56 '>
        <img className='h-full w-full object-cover' src={titlePic || "/placeholder-800x400.jpeg"} />
      </div>

      <div>

        <div className='flex justify-between'>
          <div className="flex font-semibold items-center  font-mono  ">
            <div
              className=' size-8 transform bg-primary border-2 rounded-full overflow-hidden transition-all hover:'
            >
              <img
                className='w-full h-full object-cover'
                src={authorPic || "/placeholder.png"} />
            </div>
            <p className="ml-1">
              {author}
            </p>

            <p className='font-bold text-lg mx-1'>
              -
            </p>

            <p className='font-semibold font-mono text-sm '>
              {getDate(createdAt)}
            </p>
          </div>

          <div>

            {showDelete && <DeleteDialog id={_id || ""} />}

            <button
              disabled={isLikingBlog}
              onClick={() => likeBlog(_id || "")}
              className={`${likes.includes(authorId) ? "text-red-500" : ""}  flex  gap-1 hover:text-red-500 items-center`}
            >
              <RiHeartLine />
            </button>

          </div>

        </div>

        <Link
          to={`/blog/${_id}`}
        >
          <h1 className='font-bold max-h-19  overflow-hidden text-3xl mt-1'>{title}</h1>
        </Link>

        <div className="tiptap  h-24 overflow-hidden "
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <div className='font-bold font-mono mt-2 align-bottom text-blue-500'>

          <Link
            to={`/tag/${tag}`}
            className='mx-2'
          >
            {tag}
          </Link>

        </div>
      </div>

    </div>
  )
}
