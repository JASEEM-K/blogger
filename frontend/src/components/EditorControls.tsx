import { Editor } from "@tiptap/react"
import { useCallback } from "react"
import {
  RiBold,
  RiCodeBlock,
  RiCodeLine,
  RiDoubleQuotesR,
  RiImageLine,
  RiItalic,
  RiLink,
  RiLinkUnlinkM,
  RiListOrdered2,
  RiListUnordered,
  RiMarkPenLine,
  RiStrikethrough,
  RiUnderline
} from '@remixicon/react'

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

  const toggleLink = useCallback(() => {
    const url = window.prompt("Url")
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }, [editor])

  return (
    <div>

      <div className="flex gap-2 px-4 " >

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${editor.isActive('bold') ? 'bg-purple-500' : ''} px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          <RiBold />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${editor.isActive('italic') ? 'bg-purple-500' : ''} px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          <RiItalic />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${editor.isActive('strike') ? 'bg-purple-500' : ''} px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          <RiStrikethrough />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${editor.isActive('underline') ? 'bg-purple-500' : ''} px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          <RiUnderline />
        </button>

        <button
          onClick={toggleLink}
          className={`${editor.isActive('link') ? 'bg-purple-500' : ''} px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          <RiLink />
        </button>

        {editor.isActive('link') &&
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            className={` px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
          >
            <RiLinkUnlinkM />
          </button>
        }

        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`${editor.isActive('highlight') ? 'bg-purple-500' : ''} px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          <RiMarkPenLine />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`${editor.isActive('code') ? 'bg-purple-500' : ''} px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          <RiCodeLine />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`${editor.isActive('codeBlock') ? 'bg-purple-500' : ''} px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          <RiCodeBlock />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${editor.isActive('bulletList') ? 'bg-purple-500' : ''} px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          <RiListUnordered />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${editor.isActive('orderedList') ? 'bg-purple-500' : ''} px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          <RiListOrdered2 />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`${editor.isActive('blockquote') ? 'bg-purple-500' : ''} px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          <RiDoubleQuotesR />
        </button>

        <button
          onClick={addImage}
          className={` px-1 hover:bg-slate-500 rounded-md border border-slate-500 `}
        >
          <RiImageLine />
        </button>

      </div>

    </div >
  )
}
