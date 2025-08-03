import { useField } from './hooks/useField';
import { useResource } from './hooks/useResource';
import Notification from './Components/Notification';
import { useDispatch } from 'react-redux';
import { setNotification } from './features/notificationSlice';
import { initializeBlogs, createBlog } from './features/blogSlice';
import { initializeUsers, createUser } from './features/userSlice';
import { useEffect } from 'react';
import Blogs from './Components/Blogs';
import Users from './Components/Users';
import { Link, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import UserBlogs from './Components/UserBlogs';

const App = () => {
  const { reset: resetContent, ...content } = useField('text');
  const { reset: resetName, ...name } = useField('text');
  const { reset: resetNumber, ...number } = useField('text');

  const [users, userService] = useResource('http://localhost:3005/users');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  const handleblogSubmit = (event) => {
    event.preventDefault();
    resetContent();
    dispatch(setNotification(`${content.value} added`));
    dispatch(createBlog({ content: content.value, likes: 0 }));
  };

  const handleUserSubmit = (event) => {
    event.preventDefault();
    // userService.create({ name: name.value, number: number.value });
    resetName();
    resetNumber();
    dispatch(createUser({ name: name.value, number: number.value }));
    dispatch(setNotification(`${name.value} ${number.value} added`));
  };

  return (
    <div>
      <Link style={{ padding: 5 }} to="/">main</Link>
      <Link style={{ padding:5 }} to="/users">users</Link>
      <Routes>
        <Route path="/" element={
          <>
            <Notification />
            <h2>blogs</h2>
            <form onSubmit={handleblogSubmit}>
              <input {...content} />
              <button>create</button>
            </form>
            <Blogs />
          </>
        } />
        <Route path="/users" element={
          <div>
            <h2>blogs</h2>
            <Login />
            <h2>Users</h2>
            <Users />
          </div>
        } />
        <Route path='/users/:id' element={
          <>
            <h2>blogs</h2>
            <Login />
            <UserBlogs />
          </>
        } />
      </Routes>
    </div>
  );
};

export default App;
