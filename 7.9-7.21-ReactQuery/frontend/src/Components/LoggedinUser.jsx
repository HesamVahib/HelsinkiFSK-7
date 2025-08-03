import { Display } from './Display';
import { useUser, useUserDispatch } from '../Context/UserContext';

const LoggedinUser = () => {
    const user = useUser();
    const userDispatch = useUserDispatch();

    const logout = () => {
        userDispatch({ type: 'LOGOUT' });
        window.localStorage.removeItem('loggedBlogappUser');
    };

    return (
        <div className='fst-italic'>
            {`${user.username} logged in`} 
            <button style={{ marginLeft: '5px' }} onClick={logout}>Logout</button>
        </div>
    );
};

export default LoggedinUser;