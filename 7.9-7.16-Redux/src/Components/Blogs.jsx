import { useSelector, useDispatch } from 'react-redux';
import { eliminateBlog, likedBlog } from '../features/blogSlice';
import { setNotification } from '../features/notificationSlice';

const Blogs = () => {
  const blogList = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  const likeHandler = (blog) => {
    dispatch(likedBlog(blog));
    dispatch(setNotification(`you liked ${blog.content}`, 2000));
  };

  const deleteHandler = (blog) => {
    dispatch(eliminateBlog(blog));
    dispatch(setNotification(`you deleted ${blog.content}`, 2000));
  };

  return (
    <div>
      {blogList.map((blog) => (
        <div key={blog.id}>
          {blog.content} has {blog.likes} likes
          <button onClick={() => likeHandler(blog)}>like</button>
          <button onClick={() => deleteHandler(blog)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default Blogs;
