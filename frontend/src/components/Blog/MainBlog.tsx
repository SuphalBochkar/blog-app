import { dateFormatter } from "./BlogCard";
import { JSONContent } from "novel";
import { defaultExtensions } from "../Novel-Tailwind/editor/extensions";
import { slashCommand } from "../Novel-Tailwind/editor/slash-command";

import { EditorContent, useEditor } from "@tiptap/react";
// import { EditorProvider } from "@tiptap/react";
// import { Color } from "@tiptap/extension-color";
// import StarterKit from "@tiptap/starter-kit";
// import ListItem from "@tiptap/extension-list-item";
// import TextStyle from "@tiptap/extension-text-style";
// import Document from "@tiptap/extension-document";
// import Paragraph from "@tiptap/extension-paragraph";
// import Text from "@tiptap/extension-text";
// import Highlight from "@tiptap/extension-highlight";

const MainBlog = ({ blog }: { blog: any }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto p-5">
      <div className="w-full">
        <div className="text-5xl font-extrabold">{blog.title}</div>
        <div className="text-slate-500 pt-4">
          Posted on {dateFormatter(blog.publishedDate)}
        </div>
        <Edit blog={blog} />
      </div>
    </div>
  );
};
export default MainBlog;

const Edit = ({ blog }: { blog: any }) => {
  const getContent = () => {
    try {
      const jsonData: JSONContent = JSON.parse(blog.content);
      console.log("JsonData: ", jsonData);
      return jsonData;
    } catch (e) {
      return blog.content;
    }
  };

  const initialValue = getContent();

  const extensions = [...defaultExtensions, slashCommand];
  const editor = useEditor({
    editable: false,
    content: initialValue,

    extensions,
    // extensions: [StarterKit],

    // extensions: [
    //   StarterKit,
    //   Document,
    //   Paragraph,
    //   Text,
    //   ListItem,
    //   TextStyle,
    //   Color,
    //   Highlight,
    // ],
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="prose">
      <EditorContent editor={editor} />
      {/* <EditorContent
        className="p-5 m-4 rounded-md border"
        editor={editor}
        extensions={extensions}
        {...(initialValue && { initialContent: initialValue })}
      /> */}

      {/* <EditorContent
        editor={editor}
        className="p-10 m-4 rounded-md"
        editorprops={{
          attributes: {
            class: `prose prose-lg dark:prose-invert prose-headings:font-title font-default focus:outline-none max-w-full`,
          },
        }}
      /> */}
    </div>
  );
};
