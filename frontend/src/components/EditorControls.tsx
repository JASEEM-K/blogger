import { Editor } from "@tiptap/react"
import { useCallback } from "react"
import {
  RiAlignCenter,
  RiAlignJustify,
  RiAlignLeft,
  RiAlignRight,
  RiBold,
  RiCodeBlock,
  RiCodeLine,
  RiDoubleQuotesR,
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiHeading,
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"

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
    <div className="">

      <div className="flex px-4 bg-secondary py-2 rounded-md border-2  " >

        <div
          className=" flex items-center gap-2 border-r-2 border-slate-500 px-4 "
        >
          <DropdownMenu>
            <DropdownMenuTrigger>
              <RiHeading className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className=" -translate-y-9 ml-20 border-2 rounded-sm gap-2 h-12 shadow flex items-center p-2 bg-secondary"
            >

              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`${editor.isActive('heading', { level: 1 }) ? 'text-purple-500' : ''} `}
              >
                <RiH1 />
              </button>

              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`${editor.isActive('heading', { level: 2 }) ? 'text-purple-500' : ''} `}
              >
                <RiH2 />
              </button>

              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`${editor.isActive('heading', { level: 3 }) ? 'text-purple-500' : ''} `}
              >
                <RiH3 />
              </button>

              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                className={`${editor.isActive('heading', { level: 4 }) ? 'text-purple-500' : ''} `}
              >
                <RiH4 />
              </button>

              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                className={`${editor.isActive('heading', { level: 5 }) ? 'text-purple-500' : ''} `}
              >
                <RiH5 />
              </button>

              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                className={`${editor.isActive('heading', { level: 6 }) ? 'text-purple-500' : ''} `}
              >
                <RiH6 />
              </button>

            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div
          className=" flex items-center gap-2 border-r-2 border-slate-500 px-4 "
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`${editor.isActive('bold') ? 'text-purple-500' : ''} `}
          >
            <RiBold />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`${editor.isActive('italic') ? 'text-purple-500' : ''} `}
          >
            <RiItalic />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`${editor.isActive('strike') ? 'text-purple-500' : ''} `}
          >
            <RiStrikethrough />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`${editor.isActive('underline') ? 'text-purple-500' : ''} `}
          >
            <RiUnderline />
          </button>

        </div>

        <div
          className=" flex items-center gap-2 border-r-2 border-slate-500 px-4 "
        >
          <button
            onClick={toggleLink}
            className={`${editor.isActive('link') ? 'text-purple-500' : ''} `}
          >
            <RiLink />
          </button>

          {editor.isActive('link') &&
            <button
              onClick={() => editor.chain().focus().unsetLink().run()}
              className={` `}
            >
              <RiLinkUnlinkM />
            </button>
          }

          <button
            onClick={addImage}
            className={` `}
          >
            <RiImageLine />
          </button>
        </div>

        <div
          className=" flex items-center gap-2 border-r-2 border-slate-500 px-4 "
        >
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`${editor.isActive('highlight') ? 'text-purple-500' : ''} `}
          >
            <RiMarkPenLine />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`${editor.isActive('code') ? 'text-purple-500' : ''} `}
          >
            <RiCodeLine />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`${editor.isActive('codeBlock') ? 'text-purple-500' : ''} `}
          >
            <RiCodeBlock />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`${editor.isActive('blockquote') ? 'text-purple-500' : ''} `}
          >
            <RiDoubleQuotesR />
          </button>
        </div>
        <div
          className=" flex items-center gap-2 border-r-2 border-slate-500 px-4 "
        >
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`${editor.isActive('bulletList') ? 'text-purple-500' : ''} `}
          >
            <RiListUnordered />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`${editor.isActive('orderedList') ? 'text-purple-500' : ''} `}
          >
            <RiListOrdered2 />
          </button>
        </div>

        <div
          className=" flex items-center gap-2 px-4 "
        >
          <DropdownMenu>
            <DropdownMenuTrigger>
              <RiAlignLeft
                className="cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className=" -translate-y-9  mr-44 shadow border-2 h-12 rounded-sm gap-2 flex items-center p-2 bg-secondary"
            >
              <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                className={`${editor.isActive({ textAlign: 'left' }) ? 'text-purple-500' : ''} `}
              >
                <RiAlignLeft />
              </button>

              <button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                className={`${editor.isActive({ textAlign: 'center' }) ? 'text-purple-500' : ''} `}
              >
                <RiAlignCenter />
              </button>

              <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                className={`${editor.isActive({ textAlign: 'right' }) ? 'text-purple-500' : ''}`}
              >
                <RiAlignRight />
              </button>

              <button
                onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                className={`${editor.isActive({ textAlign: 'justify' }) ? 'text-purple-500' : ''} `}
              >
                <RiAlignJustify />
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>

    </div >
  )
}
