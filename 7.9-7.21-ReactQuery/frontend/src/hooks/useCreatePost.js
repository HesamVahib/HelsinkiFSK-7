import { createBlogPost } from '../api/blogApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreatePost = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createBlogPost,
        onSuccess: () => {
            queryClient.invalidateQueries(['blogPosts']);
        },
    });
}