import { getDate } from '@/lib/date'
import DOMPurify from 'dompurify'
import { DeleteDialog } from './deleteDialog'
import { Link } from 'react-router';

interface Props {
  _id: string,
  content: string,
  tag: string,
  author: string,
  showDelete: boolean;
  authorPic: string,
  createdAt: string,
  titlePic: string,
  title: string,
  likes: number,
  comment: number,
}

export const FullBlogComp = ({ _id, comment, showDelete, likes, content, tag, title, author, createdAt, titlePic, authorPic }: Props) => {

  const htmlContent = DOMPurify.sanitize(content || "")


  return (
    <div className='grid grid-cols-2 gap-3 mt-4'>

      <div className='overflow-hidden rounded-md max-h-56 '>
        <img className='h-full w-full object-cover' src={titlePic || "/placeholder-800x400.jpeg"} />
      </div>

      <div>

        <div className='flex justify-between'>
          <div className="flex font-semibold items-center mt-2 font-mono gap-2 ">
            <div
              className=' size-8 transform bg-primary border-2 rounded-full overflow-hidden transition-all hover:'
            >
              <img
                className='w-full h-full object-cover'
                src={authorPic || "/placeholder.png"} />
            </div>
            <p className="">
              {author}
            </p>

            <p className='font-bold text-lg'>
              -
            </p>

            <p className='font-semibold font-mono text-sm '>
              {getDate(createdAt)}
            </p>
          </div>

          {showDelete && <DeleteDialog id={_id || ""} />}

        </div>

        <h1 className='font-bold text-3xl mt-1.5'>{title}</h1>

        <div className="tiptap mt-3 h-24 overflow-hidden "
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <div className='font-bold font-mono mt-2 align-bottom text-blue-500'>

          <Link
            to={`/tag/${tag}`}
          >
            {tag}
          </Link>

        </div>
      </div>

    </div>
  )
}
