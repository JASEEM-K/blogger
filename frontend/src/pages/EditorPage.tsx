import { ChangeEvent, useState } from 'react'
import {
  EditorContent,
  useEditor
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { EditorControls } from '../components/EditorControls'
import FileHandler from '@tiptap-pro/extension-file-handler'
import Image from '@tiptap/extension-image'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Typography from '@tiptap/extension-typography'
import TextAlign from '@tiptap/extension-text-align'
import { useBlogStore } from '@/sotres/blog.store'
import { validateCreateBlog } from '@/lib/formValidation'
import toast from 'react-hot-toast'
import { useUserStore } from '@/sotres/user.store'
import { FullBlogComp } from '@/components/FullBlogComp'
import { MiniBlogCard } from '@/components/MiniBlogCard'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { useNavigate } from 'react-router'


export const EditorPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    titlePic: "",
    tag: "",
    content: "",
  })
  const [showPreview, setShowPreview] = useState(false)
  const { createBlog, isCreating, uploadImage, } = useBlogStore()
  const { authUser } = useUserStore()
  const navigate = useNavigate()
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Highlight,
      Underline,
      Link,
      Typography,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      FileHandler.configure({
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        onDrop: (currentEditor, files, pos) => {
          files.forEach(file => {
            const fileReader = new FileReader()

            fileReader.readAsDataURL(file)
            fileReader.onload = async () => {
              const formData = {
                image: fileReader.result as string
              }
              const imageURL = await toast.promise(uploadImage(formData), {
                success: "image adde",
                loading: "uploading image",
                error: "failed to add image"
              })
              console.log(imageURL, typeof (formData), formData);

              currentEditor.chain().insertContentAt(pos, {
                type: 'image',
                attrs: {
                  src: imageURL,
                },
              }).focus().run()
            }
          })
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach(file => {
            if (htmlContent) {
              // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
              // you could extract the pasted file from this url string and upload it to a server for example
              console.log(htmlContent) // eslint-disable-line no-console
              return false
            }

            const fileReader = new FileReader()

            fileReader.readAsDataURL(file)
            fileReader.onload = async () => {
              const formData = {
                image: fileReader.result as string
              }
              const imageURL = await toast.promise(uploadImage(formData), {
                success: "image adde",
                loading: "uploading image",
                error: "failed to add image"
              })
              currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
                type: 'image',
                attrs: {
                  src: imageURL,
                },
              }).focus().run()
            }
          })
        },
      })
    ],
    content: `<p>Write your Blog</p>`,
    editorProps: {
      attributes: {
        spellcheck: "false",
      }
    }
  })


  const handleSubmit = () => {
    if (validateCreateBlog(formData)) {
      toast.promise(createBlog(formData), {
        loading: "Creating",
        success: "Blog created",
        error: "Something went wrong",
      }).then(() => {
        navigate('/')
      }).catch(() => toast.error("Something went wrong"))
    }



  }

  if (!editor) {
    return null
  }

  const GoToPreview = () => {
    setFormData({
      ...formData,
      content: editor?.getHTML() || "",
    })
    setShowPreview(true)
  }

  const tagsList = ["Tech", "Entertainment", "Political", "Movie", "Games", "Other"]

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
      setFormData({ ...formData, titlePic: imageURL })
    }
  }





  return (
    <div className='mx-auto h-screen max-w-screen-md p-4 '>

      {showPreview ?
        <div
          className=" mb-4 items-center "
        >
          <input
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder='Enter Blog Title'
            className='h-10 w-full border-2 bg-transparent rounded-md px-4 '
          />

          <div className='flex mt-2 items-center gap-3'>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <input
                  disabled={true}
                  placeholder='Choose a Tag'
                  className='h-10 w-40 outline-none cursor-pointer border-2 bg-transparent rounded-md px-4 '
                  value={formData.tag}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='border-2 px-4 mt-4 mr-3 rounded-md gap-2 flex flex-col font-semibold space-y-1 py-1 pb-3 w-52 bg-secondary '
              >
                <DropdownMenuLabel>Choose a Tag</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {tagsList.map((tl) => (
                  <div className='flex items-center gap-2'>
                    <div
                      className='w-3'
                    >
                      {formData.tag === tl && <div
                        className='size-3  rounded-full translate-y-0.105 bg-blue-500' />}
                    </div>
                    <DropdownMenuItem
                      className='outline-none hover:cursor-pointer'
                      onClick={() => setFormData({ ...formData, tag: tl })}
                    >
                      {tl}
                    </DropdownMenuItem>
                  </div>
                ))}

              </DropdownMenuContent>
            </DropdownMenu>

            <input
              type='file'
              onChange={(e) => handleFileChange(e)}
            />
          </div>


          <div className='flex gap-4 mt-2 justify-end'>
            <button
              onClick={() => setShowPreview(false)}
              className='flex justify-center items-center font-semibold text-blue-500 rounded-md h-9 w-fit px-4  hover:bg-blue-300/20 disabled:cursor-not-allowed  hover:border-2 border-blue-500 '
            >
              Go Back
            </button>

            <button
              onClick={handleSubmit}
              disabled={isCreating}
              className='flex justify-center items-center font-semibold bg-blue-500 rounded-md border-2 h-9 w-fit px-4 border-blue-500 text-white hover:bg-transparent hover:text-blue-500 disabled:cursor-not-allowed  '
            >
              save
            </button>
          </div>


          <FullBlogComp
            title={formData.title || ""}
            authorId={""}
            tag={formData.tag || ""}
            showDelete={false}
            titlePic={formData.titlePic || ""}
            createdAt={"2025-11-03T45"}
            authorPic={authUser?.profilePic || ""}
            content={formData.content || ""}
            _id={""}
            author={authUser?.username || ""}
            likes={["dlksjf", "dslkjf", "dlkf"]}
          />

          <div className='grid sm:grid-cols-3 gap-3'>

            <MiniBlogCard
              title={formData.title || ""}
              authorId={""}
              tag={formData.tag || ""}
              titlePic={formData.titlePic || ""}
              createdAt={"2025-11-03T45"}
              authorPic={authUser?.profilePic || ""}
              content={formData.content || ""}
              _id={""}
              author={authUser?.username || ""}
              likes={["dlksjf", "dslkjf", "dlkf"]}
            />

            <MiniBlogCard
              title={formData.title || ""}
              authorId={""}
              tag={formData.tag || ""}
              titlePic={formData.titlePic || ""}
              createdAt={"2025-11-03T45"}
              authorPic={authUser?.profilePic || ""}
              content={formData.content || ""}
              _id={""}
              author={authUser?.username || ""}
              likes={["dlksjf", "dslkjf", "dlkf"]}
            />

            <MiniBlogCard
              title={formData.title || ""}
              authorId={""}
              tag={formData.tag || ""}
              titlePic={formData.titlePic || ""}
              createdAt={"2025-11-03T45"}
              authorPic={authUser?.profilePic || ""}
              content={formData.content || ""}
              _id={""}
              author={authUser?.username || ""}
              likes={["dlksjf", "dslkjf", "dlkf"]}
            />

          </div>


        </div>

        :

        <div className='h-screen w-full mb-20'>
          <EditorControls editor={editor} />

          <div
            className='  h-screen sm:h-96  mt-4 overflow-scroll px-1'
          >
            <EditorContent className='tiptap editor-content border-2 px-0 py-0 ' editor={editor} />
          </div>

          <button
            onClick={GoToPreview}
            className='flex justify-center items-center font-semibold bg-blue-500 rounded-md border-2 h-11 w-fit px-4 border-blue-500 text-white hover:bg-transparent hover:text-blue-500 disabled:cursor-not-allowed  '
          >
            Show Preview
          </button>

        </div>

      }
    </div >
  )
}
