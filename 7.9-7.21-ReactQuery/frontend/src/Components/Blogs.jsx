import { useBlogPosts } from '../hooks/useBlogPosts';
import { Link } from 'react-router-dom';



const SortBlogs = () => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: 'block',
    textDecoration: 'underline',
    color: 'blue',
    cursor: 'pointer'
  };

  const { data: blogPosts } = useBlogPosts();
  const sortedBlogs = [...blogPosts].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {sortedBlogs.map(blog => (
        <Link style={blogStyle} key={blog.id} to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      ))}
    </div>
  );
};

export { SortBlogs };
