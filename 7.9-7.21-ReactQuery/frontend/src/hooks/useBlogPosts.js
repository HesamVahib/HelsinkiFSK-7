import { useQuery } from "@tanstack/react-query";
import { fetchBlogPosts } from "../api/blogApi";

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts,
    refetchInterval: 5000, // Refetch every 5 seconds
    refetchIntervalInBackground: true, // Continue refetching when tab is not focused
    refetchOnWindowFocus: true, // Refetch when user switches back to tab
  });
};
