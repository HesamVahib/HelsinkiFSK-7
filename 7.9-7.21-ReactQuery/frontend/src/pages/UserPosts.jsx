import { useParams } from 'react-router-dom';
import { useBlogPosts } from '../hooks/useBlogPosts';

const UserPosts = () => {
  const { id } = useParams();
  const { data: blogPosts, isLoading, error } = useBlogPosts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  const userPosts = blogPosts.filter(post => post.user.id === id);
  console.log('userPosts:', userPosts);
  const userName = userPosts.length > 0 ? userPosts[0].user.name : 'Unknown User';

  return (
    <div>
      <h2>{userName}</h2>
      <h3>added blogs</h3>
      {userPosts.length > 0 ? (
        <ul>
          {userPosts.map(post => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      ) : (
        <p>No posts found for this user.</p>
      )}
    </div>
  );
};

export default UserPosts;