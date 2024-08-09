import AppBar from "../components/Blog/AppBar";
import BlogCard from "../components/Blog/BlogCard";
import { JSONContent } from "novel";
import useGetBlogs from "../hooks/useGetBlogs";
import { BlogCardSkeleton } from "../components/Skeletons/BlogCardSkeleton";

const Blogs = () => {
  const { loading, blogs } = useGetBlogs();

  return (
    <div>
      <div className="fixed top-0 bg-transparent w-full h-[12vh] z-50 ">
        <AppBar />
      </div>
      <section className="w-full">
        <div className="blogs-center relative lg:h-[100vmin] w-full p-[0.5vw] px-[0.5vw] md:leading-tight ">
          {/* <section className="relative w-full h-[68vmin] md:h-[68vmin]  bg-gray-600 sm:bg-green-600 md:bg-red-400 lg:bg-purple-600">
        <div className="blogs-center relative w-full lg:h-[100vmin] p-[0.5vw] px-[0.5vw] "> */}
          <img
            className="w-full h-full rounded-[15px] object-cover object-center"
            src="https://img.freepik.com/free-vector/realistic-grainy-texture_23-2149244608.jpg?t=st=1723207532~exp=1723211132~hmac=cc451b8b6066e47455c554bd3e18266675c149b950dcc1c92db3e56b46310925&w=1380"
            alt=""
          />
          <div className="absolute left-14 text-white bottom-[6%]">
            <div className="text-[2.5vw] sm:text-[5vw] md:text-[6vw] w-[70%] sm:w-[90%] mix-blend-exclusion ">
              How to improve your Ul design skills: Quickly develop an "eye" for
              great design
            </div>
            <p className="text-[1.5vw] bg-white p-2 w-[70%] my-[1vw] text-black">
              The design industry is constantly evolving, but good design is
              timeless. Learn how to quickly develop an eye for IJI design and
              improve your design skills in 2023.
            </p>
            <div className="border-2 text-[1.2vw] border-black p-[0.6vw] rounded-full text-[#000000] bg-[#ffffff00] inline-block ">
              <a href="#blogs">Browse Blogs</a>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full h-min-[100vh]">
        <div className="flex justify-center">
          <h1 className="w-[90%] px-6 mt-10 text-4xl">Recent Blog Posts</h1>
        </div>
        <div id="blogs" className=" flex justify-center mb-12">
          <div className=" grid grid-cols-1 w-[90%] md:grid-cols-2 lg:grid-cols-3 gap-10 p-6">
            {loading ? (
              <>
                {[...Array(3)].map((_, index) => (
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
                  <div key={blog.id} className="">
                    <BlogCard
                      key={blog.id}
                      id={blog.id}
                      authorName={
                        blog.author.name ? blog.author.name : "No Name"
                      }
                      title={blog.title}
                      content={blogContent}
                      publishedDate={blog.publishedDate}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
