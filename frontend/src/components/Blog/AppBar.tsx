import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { RiSearch2Line } from "react-icons/ri";
const AppBar = () => {
  return (
    <div className="w-full h-full flex p-7 justify-between items-center ">
      <div className="flex items-center space-x-6 ml-4">
        <Link to={"/blogs"} className="text-[3vw] font-bold  transition-colors">
          <div className="italic tracking-normal space-x-2 text-[2vw] font-bold p-2 bg-white">
            Blog Spot.
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 font-medium text-[1vw]">
        <div className="text-xl cursor-pointer text-white bg-black p-3 rounded-[50%] hover:scale-110">
          <RiSearch2Line />
        </div>
        <Link to={"/publish"}>
          <button
            type="button"
            className="rounded-3xl border-2 border-black bg-white px-4 py-2  hover:bg-black hover:text-white "
          >
            Add Post
          </button>
        </Link>

        <a href={"#home"}>
          <div className="">Home</div>
        </a>
        <a href="#blogs">
          <div>Blogs</div>
        </a>
        <a href="#contact">
          <div>Contact</div>
        </a>
        <Link to={"/profile"}>
          <Avatar size="big" name="Sai" />
        </Link>
      </div>
    </div>
  );
};

export default AppBar;
