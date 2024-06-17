import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import Publish from "./pages/Publish";
import Test from "./components/Test/Test";
import { cn } from "./lib/utils.ts";

function App() {
  return (
    <>
      <div className={cn("min-h-screen bg-background font-sans antialiased")}>
        <Routes>
          <Route path="/" element={<Navigate to="/signin" />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
          <Route path="/test" element={<Test />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}
export default App;
