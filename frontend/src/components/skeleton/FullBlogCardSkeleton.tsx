import { Skeleton } from "../ui/skeleton"


export const FullBlogCardSkeleton = () => {

  return (
    <div className="mx-auto my-5 space-y-4 max-w-screen-sm">
      <Skeleton className='w-60 h-10 mb-6 rounded-full' />

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

    </div>
  )
}
