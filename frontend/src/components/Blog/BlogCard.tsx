import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  console.log("BlogCardProps", {
    id,
    authorName,
    title,
    content,
    publishedDate,
  });

  return (
    <Link to={`/blog/${id}`}>
      <div className="w-full h-full mb-6">
        <div className="w-full h-[50vmin] md:h-[35vmin]">
          <img
            className="w-full h-full object-cover rounded-3xl object-center"
            src="https://i.pinimg.com/564x/fc/fe/65/fcfe65272f02ca4ee988a7ed0e79c2d1.jpg"
          />
        </div>

        <div className="flex flex-col my-3 gap-3 px-3">
          <div className="flex justify-between w-full h-[8vmin]">
            <div className=" text-xl md:text-2xl lg:text-[3.5vmin] overflow-y-hidden ">
              {title.slice(0, 50)}
            </div>
            <MdArrowOutward className="text-3xl block mt-1 w-[4vmin]" />
          </div>

          <div className="text-xl text-gray-500">
            <p>{content.slice(0, 150)}...</p>
          </div>

          <div className="flex items-center mt-3 justify-between">
            <div className="flex items-center gap-2">
              <Avatar size="small" name={authorName} />
              <div className="text-[#242323] text-base">
                {authorName.charAt(0).toUpperCase() +
                  authorName.slice(1).toLowerCase()}
                &nbsp;
                {dateFormatter(publishedDate)}
              </div>
            </div>
            <div className="">{`${Math.ceil(
              content.length / 50
            )} min(s) read`}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export function dateFormatter(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size: "small" | "big";
}) {
  return (
    <div
      className={`inline-flex items-center justify-center overflow-hidden bg-black rounded-full dark:bg-gray-600 ${
        size === "small" ? "w-8 h-8" : "w-11 h-11"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-md"
        } font-extralight text-white dark:text-white`}
      >
        {name ? name[0].toUpperCase() : ""}
      </span>
    </div>
  );
}

export default BlogCard;
