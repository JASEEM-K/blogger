import { Editor } from "@tiptap/react"
import { useCallback } from "react"

interface Props {
  editor: Editor
}


export const EditorControls = ({ editor }: Props) => {

  const addImage = useCallback(() => {
    const url = window.prompt("Url")

    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }, [editor])


  return (
    <div>

      <div className="flex gap-2 px-4 " >

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${editor.isActive('bold') ? 'bg-purple-500' : ''} px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          B
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${editor.isActive('italic') ? 'bg-purple-500' : ''} px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          I
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${editor.isActive('strike') ? 'bg-purple-500' : ''} px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          S
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${editor.isActive('strike') ? 'bg-purple-500' : ''} px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          S
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`${editor.isActive('code') ? 'bg-purple-500' : ''} px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          Inline Code
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`${editor.isActive('codeBlock') ? 'bg-purple-500' : ''} px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          Code
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${editor.isActive('bulletList') ? 'bg-purple-500' : ''} px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          list
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${editor.isActive('orderedList') ? 'bg-purple-500' : ''} px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          Ordered list
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${editor.isActive('blockquote') ? 'bg-purple-500' : ''} px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          Qoute
        </button>

        <button
          onClick={addImage}
          className={` px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          Image
        </button>

      </div>

    </div >
  )
}
