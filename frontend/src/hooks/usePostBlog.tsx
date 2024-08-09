import { useState } from "react";
import axios from "axios";

const usePostBlog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const url = import.meta.env.VITE_BACKEND_URL;

  const postBlog = async (blogData: {
    title: string;
    content: string;
    published?: boolean;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${url}/blog`, blogData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log("response", response);

      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error(response.data.error || "Failed to post blog");
      }
    } catch (error: any) {
      setError(error.response.data.error || "An unknown error occurred");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { postBlog, loading, error };
};

export default usePostBlog;
