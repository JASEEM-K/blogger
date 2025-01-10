import { } from 'react'
import {
  EditorContent,
  useEditor
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { EditorControls } from '../components/EditorControls'



export const EditorPage = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: `<p>Write your Blog</p>`,
  })

  if (!editor) {
    return null
  }

  return (
    <div>

      <EditorControls editor={editor} />

      <EditorContent editor={editor} />
    </div>
  )
}
