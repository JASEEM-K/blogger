import { } from 'react'
import {
  EditorContent,
  useEditor
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { EditorControls } from '../components/EditorControls'
import FileHandler from '@tiptap-pro/extension-file-handler'
import Image from '@tiptap/extension-image'



export const EditorPage = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
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
  })

  if (!editor) {
    return null
  }
  return (
    <div className='mx-auto max-w-screen-md p-4 '>

      <EditorControls editor={editor} />

      <EditorContent className='tiptap px-4' editor={editor} />
    </div>
  )
}
