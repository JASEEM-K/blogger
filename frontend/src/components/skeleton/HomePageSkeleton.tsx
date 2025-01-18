
import { Skeleton } from '../ui/skeleton'


export const HomePageSkeleton = () => {

  return (
    <div className='mt-10 mx-3 h-screen'>
      <div className='mt-10'>
        <Skeleton className='w-full h-8 rounded-full' />
        <div className='flex flex-col gap-1 mt-2 mx-5 '>
          <Skeleton className='w-40 h-4 rounded-full' />
        </div>
        <Skeleton className='w-full h-8 rounded-full mt-2' />
      </div>
      <div className='mt-10'>
        <Skeleton className='w-full h-8 rounded-full' />
        <div className='flex flex-col gap-1 mt-2 mx-5 '>
          <Skeleton className='w-40 h-4 rounded-full' />
        </div>
        <Skeleton className='w-full h-8 rounded-full mt-2' />
      </div>
      <div className='mt-10'>
        <Skeleton className='w-full h-8 rounded-full' />
        <div className='flex flex-col gap-1 mt-2 mx-5 '>
          <Skeleton className='w-40 h-4 rounded-full' />
        </div>
        <Skeleton className='w-full h-8 rounded-full mt-2' />
      </div>
      <div className='mt-10'>
        <Skeleton className='w-full h-8 rounded-full' />
        <div className='flex flex-col gap-1 mt-2 mx-5 '>
          <Skeleton className='w-40 h-4 rounded-full' />
        </div>
        <Skeleton className='w-full h-8 rounded-full mt-2' />
      </div>
      <div className='mt-10'>
        <Skeleton className='w-full h-8 rounded-full' />
        <div className='flex flex-col gap-1 mt-2 mx-5 '>
          <Skeleton className='w-40 h-4 rounded-full' />
        </div>
        <Skeleton className='w-full h-8 rounded-full mt-2' />
      </div>
    </div>
  )
}
