import { useBlogStore } from '../sotres/blog.store'
import { RiDeleteBin6Line } from '@remixicon/react'
import { Dialog, DialogTrigger, DialogContent } from './ui/dialog'
import toast from 'react-hot-toast'

interface Props {
  id: string
}

export const DeleteDialog = ({ id }: Props) => {
  const { deleteBlog, isDeleting } = useBlogStore()

  const handleDeletion = () => {
    toast.promise(deleteBlog(id), {
      loading: "Deleting...",
      success: "Blog deleted",
      error: "failed to delete",
    })
  }

  return (
    <Dialog >
      <DialogTrigger>
        <RiDeleteBin6Line />
      </DialogTrigger>
      <DialogContent
        className='font-semibold flex flex-col items-center max-w-fit  '
      >
        <h1 className='text-3xl px-14 '>Are you sure?</h1>
        <p>This action can&apos;t be undo.</p>
        <div className='font-mono flex justify-center mt-10 w-full'>
          <button
            disabled={isDeleting}
            className='flex justify-center items-center font-semibold bg-red-500 rounded-md border-2 h-10 w-fit px-4 border-red-500 text-white hover:bg-transparent hover:text-red-500 disabled:cursor-not-allowed  '
            onClick={handleDeletion}
          >
            delete
          </button>
        </div>
      </DialogContent>
    </Dialog >
  )
}

