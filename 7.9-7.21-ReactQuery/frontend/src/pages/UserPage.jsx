import { useBlogPosts } from '../hooks/useBlogPosts';
import { Link } from 'react-router-dom';

const UserPage = () => {

    const { data: blogPosts, isLoading, error } = useBlogPosts();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const userCount = blogPosts.reduce((acc, blog) => {
        acc[blog.user.name] = (acc[blog.user.name] || 0) + 1;
        return acc;
    }, {});

    const userId = (user) => {
        const foundUser = blogPosts.find((blog) => blog.user.name === user);
        return foundUser ? foundUser.user.id : null;
    };

    return (
        <div>
            <h2>Users</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>blogs Created</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(userCount).map(([user, count]) => (
                        <tr key={user}>
                            <td>
                                <Link to={`/users/${userId(user)}`}>{user}</Link>
                            </td>
                            <td>{count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserPage;
