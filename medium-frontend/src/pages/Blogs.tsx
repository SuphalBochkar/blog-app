import AppBar from "../components/Blog/AppBar";
import BlogCard from "../components/Blog/BlogCard";
import { JSONContent } from "novel";
import useGetBlogs from "../hooks/useGetBlogs";
import { BlogCardSkeleton } from "../components/Skeletons/BlogCardSkeleton";

const Blogs = () => {
  const { loading, blogs } = useGetBlogs();

  return (
    <div>
      <div className="fixed w-full">
        <AppBar />
      </div>
      <div className="flex justify-center pt-16">
        <div className="flex flex-col justify-center w-[40%] my-5">
          {loading ? (
            <>
              {[...Array(5)].map((_, index) => (
                <BlogCardSkeleton key={index} />
              ))}
            </>
          ) : (
            blogs.map((blog) => {
              let blogContent = "";
              try {
                const jsonContent: JSONContent = JSON.parse(blog.content);
                blogContent =
                  jsonContent.content
                    ?.map((obj) => obj.content?.[0]?.text || "")
                    .join(" ") || "";
              } catch (error) {
                console.error("Error parsing blog content:", error);
                blogContent = blog.content;
              }

              return (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  authorName={blog.author.name ? blog.author.name : "No Name"}
                  title={blog.title}
                  content={blogContent}
                  publishedDate={blog.publishedDate}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
