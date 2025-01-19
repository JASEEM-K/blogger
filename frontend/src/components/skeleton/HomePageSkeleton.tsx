
import { Skeleton } from '../ui/skeleton'


export const HomePageSkeleton = () => {

  return (
    <div className='mt-10 h-screen mx-auto max-w-screen-md'>

      <div className="grid grid-cols-2 gap-4">
        <Skeleton className='w-full h-48 rounded-md' />
        <div>
          <div className="flex items-center gap-2">
            <Skeleton className=' w-12 h-10 rounded-full' />
            <Skeleton className='w-full h-8 rounded-full' />
          </div>
          <Skeleton className='w-full h-28 mt-2 rounded-md' />
          <Skeleton className='w-full h-5 mt-2 rounded-md' />
        </div>
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
