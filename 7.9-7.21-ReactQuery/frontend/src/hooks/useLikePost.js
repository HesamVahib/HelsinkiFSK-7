import { likeBlogPost } from "../api/blogApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: likeBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogPosts"]);
    },
  });
};