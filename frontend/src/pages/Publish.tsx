import AppBar from "../components/Blog/AppBar";
import MainEditor from "../components/Novel-Tailwind/MainEditor";
import plusCircle from "../assets/images/plus-circle.png";
import { JSONContent } from "novel";
import { useState, useEffect } from "react";
import { defaultValue } from "../lib/default-value";
import usePostBlog from "../hooks/usePostBlog";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const LOCAL_STORAGE_KEY_TITLE = "editorTitle";
const LOCAL_STORAGE_KEY_CONTENT = "editorContent";

const Publish = () => {
  const [title, setTitle] = useState<string>(
    localStorage.getItem(LOCAL_STORAGE_KEY_TITLE) || ""
  );

  const [content, setContent] = useState<JSONContent>(() => {
    const savedContent = localStorage.getItem(LOCAL_STORAGE_KEY_CONTENT);
    if (savedContent) {
      try {
        const val = JSON.parse(savedContent) as JSONContent;
        return val;
      } catch {
        return defaultValue;
      }
    }
    return defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_TITLE, title);
    localStorage.setItem(LOCAL_STORAGE_KEY_CONTENT, JSON.stringify(content));
  }, [title, content]);

  const { postBlog, loading } = usePostBlog();
  const navigate = useNavigate();

  const handleSave = async () => {
    const blogData = {
      title,
      content: JSON.stringify(content),
      published: true,
    };

    try {
      const result = await postBlog(blogData);
      if (result.success) {
        toast.success("Saved successfully");
        localStorage.removeItem(LOCAL_STORAGE_KEY_TITLE);
        localStorage.removeItem(LOCAL_STORAGE_KEY_CONTENT);
        navigate("/blogs");
      } else {
        toast.error(result.error || "Failed to save");
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-transparent w-full h-[12vh] z-50">
        <AppBar />
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold">Publish Your Content</h1>
          </div>
          <button
            onClick={handleSave}
            className={`px-6 py-2 rounded-md shadow-md transition duration-300 ${
              loading
                ? "bg-blue-300 text-blue-600 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center">
            <img
              src={plusCircle}
              className="w-12 h-12 mx-3"
              alt="Plus Circle"
            />
            <div className="col-span-8 border-l-2 h-[6rem] flex items-end">
              <input
                type="text"
                placeholder="Enter title here"
                className="outline-none border-none pl-3 text-[3rem] font-medium w-full"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
          </div>
          <MainEditor value={content} setValue={setContent} />
        </div>
      </div>
    </div>
  );
};

export default Publish;
