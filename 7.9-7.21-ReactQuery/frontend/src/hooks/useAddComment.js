import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addCommentToBlogPost } from "../api/blogApi";

export const useAddComment = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: addCommentToBlogPost,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['blogPosts'],
            });
        }

    });
};
