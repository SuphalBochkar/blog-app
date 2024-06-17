import { BlogResponse } from "@finish66/medium-common";
import { useEffect, useState } from "react";
import axios from "axios";

const useGetBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<BlogResponse | null>(null);
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!id) {
      return;
    }
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${url}/blog/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log("Single Blog", response.data.data);
        setBlog(response.data.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, url]);

  return { loading, blog };
};

export default useGetBlog;
