
import { Skeleton } from '../ui/skeleton'


export const HomePageSkeleton = () => {

  return (
    <div className='mt-10 h-screen mx-auto max-w-screen-md'>

      <div className="grid grid-cols-2 gap-4 mx-3 ">
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

      <div className='grid grid-cols-3 gap-3 mx-3 '>

        <div className='mt-5 grid grid-rows-2 gap-2 '>
          <Skeleton className='w-full  rounded-md' />
          <div className='flex flex-col gap-1   '>
            <div className='flex items-center gap-2'>
              <Skeleton className='w-10 h-8 rounded-full' />
              <Skeleton className='w-full h-4 rounded-full' />
            </div>
            <Skeleton className='w-full h-8 rounded-md mt-0.5 ' />
            <Skeleton className='w-full h-14 rounded-md mt-1 ' />
            <Skeleton className='w-10 h-3 rounded-md mt-1 ' />
          </div>
        </div>


        <div className='mt-5 grid grid-rows-2 gap-2 '>
          <Skeleton className='w-full  rounded-md' />
          <div className='flex flex-col gap-1   '>
            <div className='flex items-center gap-2'>
              <Skeleton className='w-10 h-8 rounded-full' />
              <Skeleton className='w-full h-4 rounded-full' />
            </div>
            <Skeleton className='w-full h-8 rounded-md mt-0.5 ' />
            <Skeleton className='w-full h-14 rounded-md mt-1 ' />
            <Skeleton className='w-10 h-3 rounded-md mt-1 ' />
          </div>
        </div>


        <div className='mt-5 grid grid-rows-2 gap-2 '>
          <Skeleton className='w-full  rounded-md' />
          <div className='flex flex-col gap-1   '>
            <div className='flex items-center gap-2'>
              <Skeleton className='w-10 h-8 rounded-full' />
              <Skeleton className='w-full h-4 rounded-full' />
            </div>
            <Skeleton className='w-full h-8 rounded-md mt-0.5 ' />
            <Skeleton className='w-full h-14 rounded-md mt-1 ' />
            <Skeleton className='w-10 h-3 rounded-md mt-1 ' />
          </div>
        </div>


        <div className='mt-5 grid grid-rows-2 gap-2 '>
          <Skeleton className='w-full  rounded-md' />
          <div className='flex flex-col gap-1   '>
            <div className='flex items-center gap-2'>
              <Skeleton className='w-10 h-8 rounded-full' />
              <Skeleton className='w-full h-4 rounded-full' />
            </div>
            <Skeleton className='w-full h-8 rounded-md mt-0.5 ' />
            <Skeleton className='w-full h-14 rounded-md mt-1 ' />
            <Skeleton className='w-10 h-3 rounded-md mt-1 ' />
          </div>
        </div>


        <div className='mt-5 grid grid-rows-2 gap-2 '>
          <Skeleton className='w-full  rounded-md' />
          <div className='flex flex-col gap-1   '>
            <div className='flex items-center gap-2'>
              <Skeleton className='w-10 h-8 rounded-full' />
              <Skeleton className='w-full h-4 rounded-full' />
            </div>
            <Skeleton className='w-full h-8 rounded-md mt-0.5 ' />
            <Skeleton className='w-full h-14 rounded-md mt-1 ' />
            <Skeleton className='w-10 h-3 rounded-md mt-1 ' />
          </div>
        </div>


        <div className='mt-5 grid grid-rows-2 gap-2 '>
          <Skeleton className='w-full  rounded-md' />
          <div className='flex flex-col gap-1   '>
            <div className='flex items-center gap-2'>
              <Skeleton className='w-10 h-8 rounded-full' />
              <Skeleton className='w-full h-4 rounded-full' />
            </div>
            <Skeleton className='w-full h-8 rounded-md mt-0.5 ' />
            <Skeleton className='w-full h-14 rounded-md mt-1 ' />
            <Skeleton className='w-10 h-3 rounded-md mt-1 ' />
          </div>
        </div>


      </div>
    </div >
  )
}
