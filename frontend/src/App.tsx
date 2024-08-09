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
import { useAuthContext } from "./context/AuthContext.tsx";

function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <div className={cn("min-h-screen bg-background font-sans antialiased")}>
        <Routes>
          <Route
            path="/"
            element={
              authUser ? <Navigate to="/blogs" /> : <Navigate to="/signin" />
            }
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/blogs" /> : <Signup />}
          />
          <Route
            path="/signin"
            element={authUser ? <Navigate to="/blogs" /> : <Signin />}
          />
          <Route
            path="/blog/:id"
            element={authUser ? <Blog /> : <Navigate to="/signin" />}
          />
          <Route
            path="/blogs"
            element={authUser ? <Blogs /> : <Navigate to="/signin" />}
          />
          <Route
            path="/publish"
            element={authUser ? <Publish /> : <Navigate to="/signin" />}
          />
          <Route path="/test" element={<Test />} />
          <Route
            path="*"
            element={
              authUser ? <Navigate to="/blogs" /> : <Navigate to="/signin" />
            }
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}
export default App;
