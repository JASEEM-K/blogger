import { useState } from 'react'
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



export const EditorPage = () => {
  const [title, setTitle] = useState("")
  const { createBlog, isCreating } = useBlogStore()
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
            fileReader.onload = () => {
              currentEditor.chain().insertContentAt(pos, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
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
            fileReader.onload = () => {
              currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
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

  const formData = {
    title: title,
    content: editor?.getHTML() || "",
  }

  const handleSubmit = () => {
    if (validateCreateBlog(formData)) {
      toast.promise(createBlog(formData), {
        loading: "Creating",
        success: "Blog created",
        error: "Something went wrong",
      })
    }
  }


  if (!editor) {
    return null
  }
  return (
    <div className='mx-auto h-screen max-w-screen-md p-4 '>

      <div
        className='flex gap-2 mb-4 items-center '
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter Blog Title'
          className='h-10 w-full border-2 bg-transparent rounded-md px-4 '
        />
        <button
          onClick={handleSubmit}
          disabled={isCreating}
          className='flex justify-center items-center font-semibold bg-blue-500 rounded-md border-2 h-11 w-fit px-4 border-blue-500 text-white hover:bg-transparent hover:text-blue-500 disabled:cursor-not-allowed  '
        >
          save
        </button>
      </div>

      <EditorControls editor={editor} />

      <div
        className=' min-h-screen max-h-screen mt-4 overflow-scroll px-1 '
      >
        <EditorContent className='tiptap editor-content border-2 px-0' editor={editor} />
      </div>


    </div>
  )
}
