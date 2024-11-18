import { useState } from "react";
import axios, { AxiosError } from "axios";

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
      if (response.data.success) {
        return { success: true, data: response.data.data };
      } else {
        setError(response.data.error || "Failed to post blog");
        return {
          success: false,
          error: response.data.error || "Failed to post blog",
        };
      }
    } catch (e) {
      const errorMessage =
        (e as AxiosError<{ error: string }>).response?.data?.error ||
        "An unknown error occurred";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return { postBlog, loading, error };
};

export default usePostBlog;
