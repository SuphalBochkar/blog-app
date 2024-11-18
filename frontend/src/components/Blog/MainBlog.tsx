import { Avatar, dateFormatter, timeFormatter } from "./BlogCard";
import { JSONContent } from "novel";
import { defaultExtensions } from "../Novel-Tailwind/editor/extensions";
import { slashCommand } from "../Novel-Tailwind/editor/slash-command";

import { EditorContent, useEditor } from "@tiptap/react";

import Image from "../../assets/images/carousel1.png";

const MainBlog = ({ blog }: { blog: any }) => {
  return (
    <div className="flex flex-col p-6">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          {blog.title}
        </h1>
        <div className="flex items-center space-x-4 mb-3">
          <Avatar size="big" name={blog?.author.name || "Anonymous"} />
          <div className="flex flex-col">
            <div className="text-xl font-bold">
              {blog?.author.name || "Anonymous"}
            </div>
            <div className="text-gray-600 text-sm">
              <span>Posted on</span>
              <span className="mx-1"> {dateFormatter(blog.publishedDate)}</span>
              <span>&middot;</span>
              <span> {timeFormatter(blog.publishedDate)}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <img
          src={Image}
          alt="blog"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <Edit blog={blog} />
    </div>
  );
};

export default MainBlog;

export const Edit = ({ blog }: { blog: any }) => {
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
    <>
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
    </>
  );
};
