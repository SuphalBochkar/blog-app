import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

const AppBar = () => {
  return (
    <div className="bg-gray-800 text-white border-b-2 border-gray-600 flex justify-between items-center px-8 py-4 shadow-md w-full">
      <div className="flex items-center space-x-6">
        <Link
          to={"/blogs"}
          className="text-2xl font-bold hover:text-gray-300 transition-colors"
        >
          SAi Blogs
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to={"/publish"}>
          <button
            type="button"
            className="bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors"
          >
            Add Post
          </button>
        </Link>
        <Avatar size="big" name="Sai" />
      </div>
    </div>
  );
};

export default AppBar;
