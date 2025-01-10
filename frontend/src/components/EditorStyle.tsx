import StarterKit from "@tiptap/starter-kit"


export const EditorStyle = () => {
  const customKit = StarterKit.extend({
    renderHTML({ HTMLSttributes }) {
      return ['b', HTMLAttributes, 0]
    },
  })

  return (
)
}
