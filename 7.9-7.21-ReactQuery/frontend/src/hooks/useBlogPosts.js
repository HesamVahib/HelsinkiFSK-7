import { useQuery } from "@tanstack/react-query";
import { fetchBlogPosts } from "../api/blogApi";

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });
};
