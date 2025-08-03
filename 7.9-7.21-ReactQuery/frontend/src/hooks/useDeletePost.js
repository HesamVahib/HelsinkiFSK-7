import { deleteBlogPost } from '../api/blogApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteBlogPost,
        onSuccess: () => {
            queryClient.invalidateQueries(['blogPosts']);
        },
    });
}