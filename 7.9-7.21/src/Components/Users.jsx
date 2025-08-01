import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = () => {
    const users = useSelector((state) => state.user);

return (
    <table>
        <thead>
            <tr>
                <th></th>
                <th>Blogs Created</th>
            </tr>
        </thead>
        <tbody>
            {users.map((n) => (
                <tr key={n.id}>
                    <td><Link to={`/users/${n.id}`}>{n.name}</Link></td>
                    <td>{n.blogs.length}</td>
                </tr>
            ))}
        </tbody>
    </table>
);
};

export default Users;
