import { useState } from 'react';
import PropTypes from 'prop-types';
import { useBlogPosts } from '../hooks/useBlogPosts';
import { useDeletePost } from '../hooks/useDeletePost';
import { useLikePost } from '../hooks/useLikePost';

const Blogs = ({ setBlogs, blog, user }) => {

  const [detailsVisible, setDetailsVisible] = useState(false);
  
  const deletePostMutation = useDeletePost();
  const likePostMutation = useLikePost();

  const isCreator = blog.user && user && blog.user.username === user.username;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleDetails = () => (
    <button onClick={() => setDetailsVisible(!detailsVisible)} name="view">
      {detailsVisible ? 'hide' : 'view'}
    </button>
  );

  const likeButton = blogId => {

    const handleLike = () => {
      likePostMutation.mutate(blogId, {
        onError: (error) => {
          console.error('Error liking blog:', error);
        }
      });
    };

    return (<button onClick={handleLike}>like</button>);
  };

  const deleteButton = blogId => {
    const deleteButtonStyle = {
      backgroundColor: 'blue',
      color: 'white',
      border: 'none',
      padding: '5px 10px',
      cursor: 'pointer',
    };

  const handleDelete = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      return;

    deletePostMutation.mutate(blogId, {
      onSuccess: () => {
        setBlogs(prevBlogs => prevBlogs.filter(b => b.id !== blogId));
      },
      onError: (error) => {
        console.error('Error deleting blog:', error);
      },
    });
  };

  return (
    <button onClick={handleDelete} style={deleteButtonStyle} name="remove">
      remove
    </button>
  );
};


  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author} {toggleDetails()}
      {detailsVisible && (
        <div>
          <div>{blog.url}</div>
          <div>
            {blog.likes} likes {likeButton(blog.id)}
          </div>
          <div>added by {blog.user.name}</div>
          {isCreator ? deleteButton(blog.id) : null}
        </div>
      )}
    </div>
  )
};

const SortBlogs = ({ setBlogs, user }) => {
  const { data: blogPosts } = useBlogPosts();
  const sortedBlogs = [...blogPosts].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {sortedBlogs.map(blog => (
        <Blogs key={blog.id} setBlogs={setBlogs} blog={blog} user={user} />
      ))}
    </div>
  );
};

Blogs.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
export { Blogs, SortBlogs };
