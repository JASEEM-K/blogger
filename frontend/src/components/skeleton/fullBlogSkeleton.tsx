import { } from 'react'
import { Skeleton } from '../ui/skeleton'


export const FullBlogSkeleton = () => {

  return (
    <div className='mt-10 mx-3 h-screen'>
      <Skeleton className='w-full h-8 rounded-full' />
      <div className='flex flex-col gap-1 mt-2 mx-5 '>
        <Skeleton className='w-40 h-4 rounded-full' />
        <Skeleton className='w-40 h-4 rounded-full' />
      </div>
      <Skeleton className='w-full h-full rounded-lg mt-2' />
    </div>
  )
}
