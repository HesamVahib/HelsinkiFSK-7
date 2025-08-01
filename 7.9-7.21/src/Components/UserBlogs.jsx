import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

const UserBlogs = () => {
  const { id } = useParams();
  const user = useSelector(state => state.user)
  console.log(user);

  if (!user || !user.length) {
    return <div>Loading...</div>;
  }

  const userName = user.find(u => u.id === id)?.name || 'User not found';

  const userBlogs = user.find(u => u.id === id)?.blogs || [];

  return (
    <div>
      <h2>{userName}</h2>
      <h3>added blogs</h3>
      <ul>
        {userBlogs.map(blog => (
          <li key={blog.id}>{blog.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserBlogs;
