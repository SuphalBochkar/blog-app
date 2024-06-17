import { BlogResponse } from "@finish66/medium-common";
import axios from "axios";
import { useEffect, useState } from "react";

const useGetBlogs = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<BlogResponse[]>([]);
  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const response = await axios.get(`${url}/blog/bulk`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBlogs(response.data.data);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  return { loading, blogs };
};

export default useGetBlogs;
