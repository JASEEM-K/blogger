import { Editor } from "@tiptap/react"

interface Props {
  editor: Editor
}


export const EditorControls = ({ editor }: Props) => {


  return (
    <div>

      <div className="flex gap-2 px-4 " >

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${editor.isActive('bold') ? 'bg-purple-500' : ''}
px-1 hover:bg-slate-500 rounded-md border border-slate-500
`}
        >
          B
        </button>

      </div>

    </div >
  )
}
