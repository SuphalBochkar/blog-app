import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar } from "../components/Blog/BlogCard";
import AppBar from "../components/Blog/AppBar";
import MainBlog from "../components/Blog/MainBlog";
import useGetBlog from "../hooks/useGetBlog";
import MainBlogSkeleton from "../components/Skeletons/MainBlogSkeleton";
import { AuthorSkeleton } from "../components/Skeletons/AuthorSkeleton";

const Blog = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();
  const { loading, blog } = useGetBlog({ id: id || "" });

  useEffect(() => {
    if (!id) {
      navigate("/blogs");
    }
  }, [id, navigate]);

  return (
    <div>
      <AppBar />
      <div className="flex-grow grid grid-cols-12 gap-4 px-8 pt-8 max-w-screen-2xl mx-auto">
        <div className="col-span-12 md:col-span-8 flex justify-center">
          {loading && <MainBlogSkeleton />}
          {!loading && !blog && (
            <h1 className="text-2xl font-semibold">No blog found</h1>
          )}
          {!loading && blog && <MainBlog blog={blog} />}
        </div>
        <div className="hidden md:flex col-span-12 md:col-span-4 p-5">
          {loading ? (
            <AuthorSkeleton />
          ) : (
            blog && (
              <div>
                <div>Author</div>
                <div className="flex w-full pt-2">
                  <div>
                    <Avatar size="big" name={blog.author.name || "Anonymous"} />
                  </div>
                  <div className="flex flex-col ml-4">
                    <div className="text-xl font-bold">
                      {blog.author.name || "Anonymous"}
                    </div>
                    <div className="pt-2 text-slate-500">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Temporibus, doloribus.
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
