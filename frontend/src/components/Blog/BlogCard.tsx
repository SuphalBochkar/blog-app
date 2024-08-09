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
      <div className="border-b border-slate-500 p-3 pb-2 cursor-pointer">
        <div className="flex items-center mb-2">
          <Avatar size="small" name={authorName} />
          <div className="font-extralight pl-2">{authorName}</div>
          <div className="text-[7px] pl-2">&#9679;</div>
          <div className="font-thin text-slate-500 pl-2">
            {dateFormatter(publishedDate)}
          </div>
        </div>
        <div className="text-2xl font-bold">{title}</div>
        <div className="font-normal">{content.slice(0, 150)}...</div>
        <div className="w-full text-slate-500 font-thin pt-3">{`${Math.ceil(
          content.length / 50
        )} minute(s) read`}</div>
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
      className={`inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-md"
        } font-extralight text-gray-600 dark:text-gray-300`}
      >
        {name ? name[0].toUpperCase() : ""}
      </span>
    </div>
  );
}

export default BlogCard;
