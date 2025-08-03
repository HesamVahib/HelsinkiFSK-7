import { dispatchNotification } from "../Context/NotificationContext";
import { Display, ErrorDisplay } from "./Display";
import { useState } from "react";
import CreateBlogForm from "./NewBlog";
import { SortBlogs } from "./Blogs";
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useCreatePost } from "../hooks/useCreatePost";

const BlogPosts = ({ user, setUser, updatedBlog, setBlogs }) => {

    const { isLoading, error } = useBlogPosts();
    const createPostMutation = useCreatePost();

    const [visible, setVisible] = useState(false);

    const dispatch = dispatchNotification();

    const logoutButton = () => {
        const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem('loggedUser');
        };
        return <button onClick={handleLogout}>logout</button>;
    };

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
        setVisible(false);
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
        <Display tag="h2" text="Blogs" />
        <ErrorDisplay color="green" />
        <Display tag="p">
            {user.username} logged in {logoutButton()}
        </Display>
        <CreateBlogForm handleNewBlog={handleNewBlog} visible={visible} />
        {buttonFormToggle()}
        <SortBlogs setBlogs={setBlogs} user={user} />
        </div>
    );
};

  export default BlogPosts;