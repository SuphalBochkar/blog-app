import AppBar from "../components/Blog/AppBar";
import BlogCard from "../components/Blog/BlogCard";
import { JSONContent } from "novel";
import useGetBlogs from "../hooks/useGetBlogs";
import { BlogCardSkeleton } from "../components/Skeletons/BlogCardSkeleton";
import { useEffect, useState } from "react";
import Footer from "../components/Blog/Footer";
import Carousel from "../components/Blog/Carousel";

const Blogs = () => {
  const { loading, blogs } = useGetBlogs();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerWidth >= 768 ? 800 : 200;
      console.log("threshold", threshold);
      setIsSticky(window.scrollY > threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div className="fixed top-0 bg-transparent w-full h-[12vh] z-50 ">
        <div
          className={`transition-all duration-100 ease-in-out ${
            isSticky ? "bg-white text-black" : "bg-transparent text-white"
          }`}
        >
          <AppBar />
        </div>
      </div>
      <section className="w-full">
        <Carousel />
      </section>
      <section className="w-full h-min-[100vh]">
        <div id="blogs" className="flex justify-center">
          <h1 className="w-[90%] px-6 mt-10 text-4xl">Recent Blog Posts</h1>
        </div>
        <div className=" flex justify-center mb-12">
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
      <div id="contact" className="mx-2 pb-2">
        <Footer />
      </div>
    </div>
  );
};

export default Blogs;
