import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { RiCloseLine, RiMenuLine, RiSearch2Line } from "react-icons/ri";
import { useCallback, useState } from "react";

interface NavItemProps {
  path: string;
  hash: string;
  label: string;
}

const NavItem = ({ path, hash, label }: NavItemProps) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(path, { replace: true });
    window.setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [navigate, path, hash]);

  return (
    <div onClick={handleClick} className="cursor-pointer hover:underline">
      {label}
    </div>
  );

};

const AppBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative">
      <div className="w-full flex px-2 py-2 md:hidden">
        <div className="flex items-center w-full justify-between px-4">
          <div className="italic tracking-normal text-[1.5rem] font-bold p-2 transition-colors">
            <Link to={"/blogs"}>Blog Spot.</Link>
          </div>
          <div className="text-3xl cursor-pointer" onClick={toggleSidebar}>
            <RiMenuLine />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full text-black">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link to={"/blogs"} className="text-2xl font-bold text-gray-800">
              Blog Spot
            </Link>
            <div
              className="text-3xl cursor-pointer text-gray-800 transition-transform duration-300 ease-in-out hover:text-gray-600"
              onClick={toggleSidebar}
            >
              <RiCloseLine />
            </div>
          </div>
          <div className="flex flex-col flex-grow p-4 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="text-xl cursor-pointer text-white bg-black p-3 rounded-full transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-gray-800">
                <RiSearch2Line />
              </div>
              <Link to={"/publish"}>
                <button className="rounded-3xl border-2 border-black bg-white px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-black hover:text-white shadow-md transform hover:scale-105">
                  Add Post
                </button>
              </Link>
            </div>
            <NavItem path="/blogs" hash="#home" label="Home" />
            <NavItem path="/blogs" hash="#blogs" label="Blogs" />
            <NavItem path="/blogs" hash="#contact" label="Contact" />
            <Link to={"/profile"}>
              <Avatar size="big" name="Sai" />
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex w-full h-full px-6 py-4 justify-between items-center">
        <div className="flex items-center space-x-6 ml-4 italic text-[2vw] font-bold transition-colors">
          <Link to={"/blogs"}>Blog Spot.</Link>
        </div>
        <div className="flex items-center space-x-4 font-medium text-[1vw]">
          <div className="flex items-center space-x-4">
            <div className="text-xl cursor-pointer text-white bg-black p-3 rounded-full transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-gray-800">
              <RiSearch2Line />
            </div>

            <Link to={"/publish"}>
              <button className="rounded-3xl border-2 border-black text-black bg-white px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-black hover:text-white shadow-md transform hover:scale-105">
                Add Post
              </button>
            </Link>
          </div>

          <NavItem path="/blogs" hash="#home" label="Home" />
          <NavItem path="/blogs" hash="#blogs" label="Blogs" />
          <NavItem path="/blogs" hash="#contact" label="Contact" />
          <Link to={"/profile"}>
            <Avatar size="big" name="Sai" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppBar;
