import { validateUpdateFrom } from "@/lib/formValidation"
import { useUserStore } from "@/sotres/user.store"
import { RiPencilLine, RiUser3Line } from "@remixicon/react"
import { ChangeEvent, useRef, useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { useBlogStore } from "@/sotres/blog.store"
import toast from "react-hot-toast"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useNavigate } from "react-router"



export const UpdateProfileDialog = () => {
  const { updateUser, authUser, isUpdating } = useUserStore()
  const { uploadImage } = useBlogStore()
  const [formData, setFormData] = useState({
    username: authUser?.username || "",
    profilePic: authUser?.profilePic || "",
  })
  const ImageRef = useRef<HTMLInputElement | null>(null)
  const navigate = useNavigate()

  const handleSubmition = async () => {
    if (validateUpdateFrom(formData)) {
      if (formData.username === authUser?.username) {
        setFormData({ ...formData, username: "" })
      }

      await toast.promise(updateUser(formData), {
        success: "image adde",
        loading: "uploading image",
        error: "failed to add image"
      }).then(() => {
        navigate(`/user/${authUser?.username || formData.username}`)
      }).catch(() => {
        toast.error("Something went wrong")
      })

    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    const file = files[0]
    const fileReader = new FileReader()

    fileReader.readAsDataURL(file)
    fileReader.onload = async () => {
      const ImageUploadFrom = {
        image: fileReader.result as string
      }
      const imageURL = await toast.promise(uploadImage(ImageUploadFrom), {
        success: "image adde",
        loading: "uploading image",
        error: "failed to add image"
      })
      setFormData({ ...formData, profilePic: imageURL })
    }
  }

  return (
    <Dialog >
      <DialogTrigger>

        <div
          className="px-4 hover:bg-primary/20 rounded-md py-2"
        >
          Edit Profile
        </div>

      </DialogTrigger>
      <DialogContent
        className='font-semibold flex flex-col items-center max-w-fit  '
      >
        <DialogTitle
          className='text-3xl px-14 '>Update Profile
        </DialogTitle>

        <div className="relative group flex justify-end">
          <div
            className=' size-24 rounded-full border-2 border-slate-500/20 transform overflow-hidden  transition-all hover:'
          >
            <img className="w-full h-full object-cover" src={formData.profilePic || "/placeholder.png"} />
          </div>

          <div className="absolute hidden group-hover:block translate-y-1 ">
            <button
              className='flex items-center justify-center  font-bold bg-blue-500 rounded-full border-2 h-6 w-6 p-0.5 border-blue-800 text-white hover:bg-blue-300 hover:text-blue-800 disabled:cursor-not-allowed  '
              onClick={() => ImageRef.current?.click()}
            >
              <RiPencilLine />
            </button>
          </div>
        </div>

        <input
          type="file"
          ref={ImageRef}
          onChange={(e) => handleFileChange(e)}
          className="hidden"
        />


        <div>
          <label>
            <p>Username:</p>
          </label>
          <div
            className='flex gap-1 h-10 w-full items-center border border-slate-500 px-2 rounded-sm focus-within:border-2 focus-within:border-blue-500'
          >
            <RiUser3Line />
            <input
              type='text'
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              value={formData.username}
              placeholder='Jesse'
              className='pl-1 outline-none bg-transparent w-full'
            />
          </div>
        </div>



        <button
          disabled={isUpdating}
          className='flex justify-center items-center font-semibold bg-blue-500 rounded-md border-2 h-10 w-fit px-4 border-blue-500 text-white hover:bg-transparent hover:text-blue-500 disabled:cursor-not-allowed  '
          onClick={handleSubmition}
        >
          Save
        </button>

      </DialogContent>
    </Dialog >
  )
}
