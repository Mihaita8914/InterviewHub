import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./RichTextEditor.css";

function RichTextEditor({ value, onChange, hasError = false }) {
    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        content: value || "",
        editorProps: {
            attributes: {
                class: "rich-text-content"
            }
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        }
    });

    useEffect(() => {
        if (!editor) {
            return;
        }

        const currentContent = editor.getHTML();
        const newContent = value || "";

        if (currentContent !== newContent) {
            editor.commands.setContent(newContent);
        }
    }, [value, editor]);

    if (!editor) {
        return null;
    }

    return (
        <div className={`rich-text-editor ${hasError ? "is-invalid" : ""}`}>
            <div className="rich-text-toolbar">
                <button
                    type="button"
                    className={editor.isActive("bold") ? "active" : ""}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                >
                    Bold
                </button>

                <button
                    type="button"
                    className={editor.isActive("italic") ? "active" : ""}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                >
                    Italic
                </button>

                <button
                    type="button"
                    className={editor.isActive("heading", { level: 2 }) ? "active" : ""}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                >
                    Heading
                </button>

                <button
                    type="button"
                    className={editor.isActive("bulletList") ? "active" : ""}
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                >
                    Bullet list
                </button>

                <button
                    type="button"
                    className={editor.isActive("orderedList") ? "active" : ""}
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                >
                    Numbered list
                </button>

                <button
                    type="button"
                    className={editor.isActive("code") ? "active" : ""}
                    onClick={() => editor.chain().focus().toggleCode().run()}
                >
                    Inline code
                </button>

                <button
                    type="button"
                    className={editor.isActive("codeBlock") ? "active" : ""}
                    onClick={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                    }
                >
                    Code block
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                >
                    Undo
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                >
                    Redo
                </button>
            </div>

            <EditorContent editor={editor} />
        </div>
    );
}

export default RichTextEditor;