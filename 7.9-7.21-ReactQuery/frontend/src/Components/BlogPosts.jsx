import { dispatchNotification } from "../Context/NotificationContext";
import { useState } from "react";
import CreateBlogForm from "./NewBlog";
import { SortBlogs } from "./Blogs";
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useCreatePost } from "../hooks/useCreatePost";
import { useUser } from "../Context/UserContext";

const BlogPosts = ({ setBlogs }) => {

    const { isLoading, error } = useBlogPosts();
    const createPostMutation = useCreatePost();
    const user = useUser();

    const [visible, setVisible] = useState(false);

    const dispatch = dispatchNotification();

    const handleNewBlog = event => {
        event.preventDefault();
        const newBlog = {
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value,
        };

        createPostMutation.mutate(newBlog, {
            onSuccess: (data) => {
                dispatch({ type: 'ADD_NOTIFICATION', payload: `a new blog ${data.title} by ${data.author} added` });
                setTimeout(() => {
                    dispatch({ type: 'REMOVE_NOTIFICATION' });
                }, 5000);
                setBlogs(prevBlogs => [...prevBlogs, data]);
            },
            onError: (error) => {
                dispatch({ type: 'ADD_NOTIFICATION', payload: error.message });
                setTimeout(() => {
                    dispatch({ type: 'REMOVE_NOTIFICATION' });
                }, 5000);
            }
        });

        event.target.title.value = '';
        event.target.author.value = '';
        event.target.url.value = '';
        };

    const buttonFormToggle = () => {
    return (
        <button onClick={() => setVisible(!visible)}>
        {visible ? 'cancel' : 'new blog'}
        </button>
    );
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>      
            <CreateBlogForm handleNewBlog={handleNewBlog} visible={visible} />
            {buttonFormToggle()}
            <SortBlogs setBlogs={setBlogs} user={user} />
        </div>
    );
};

  export default BlogPosts;