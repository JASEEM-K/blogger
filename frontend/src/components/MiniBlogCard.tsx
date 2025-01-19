import { getDate } from '@/lib/date'
import DOMPurify from 'dompurify'
import { Link } from 'react-router'

interface Props {
  _id: string,
  content: string,
  tag: string,
  author: string,
  authorPic: string,
  createdAt: string,
  titlePic: string,
  title: string,
  likes: number,
  comment: number,
}

export const MiniBlogCard = ({ _id, comment, likes, content, tag, title, author, createdAt, titlePic, authorPic }: Props) => {

  const htmlContent = DOMPurify.sanitize(content || "")


  return (
    <div className='grid grid-rows-2 gap-3 mt-4 h-96'>

      <div className='overflow-hidden rounded-md flex items-center  bg-secondary'>
        <img className='w-full h-full object-cover' src={titlePic || "/placeholder-800x400.jpeg"} />
      </div>

      <div className='' >
        <div className="flex font-semibold ml-2 items-center  font-mono gap-2 ">
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
            {getDate(createdAt)}
          </p>
        </div>

        <h1 className='font-bold text-2xl ml-2 mt-1.5'>{title}</h1>

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

    </div>
  )
}
