import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import BlogPosts from './components/BlogPosts';
import { useUser, useUserDispatch } from './Context/UserContext';
import { Link, Routes, Route } from 'react-router-dom';
import LoginUser from './components/LoggedinUser';
import UserPage from './pages/UserPage';
import UserPosts from './pages/UserPosts';
import BlogPage from './pages/BlogPage';



const App = () => {

  const [updatedBlog, setBlogs] = useState([]);
  const userDispatch = useUserDispatch();  
  const user = useUser();

  useEffect(() => {
    
    const loggedUserJSON = window.localStorage.getItem('loggedUser');

    if (loggedUserJSON && loggedUserJSON !== 'undefined') {
      try {
        const user = JSON.parse(loggedUserJSON);
        userDispatch({ type: 'SET_USER', payload: user });
      } catch (error) {
        console.error('Error parsing logged user:', error);
      }
    }

  }, []);

  const navigationStyle = {
    backgroundColor: '#f0f0f0',
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    gap: '5px',
  };

  return (
    <>
      {user === null ?
      <LoginForm />
      : (
        <>
        <div className='ms-4 me-4 mt-2 mb-2'>
          <div style={navigationStyle}>
            <Link className='nav-link fw-bold' to="/">blogs</Link>
            <Link className='nav-link fw-bold' to="/users">users</Link>
            <LoginUser />
          </div>
          <h1>blog app</h1>
          <Routes>
            <Route path="/" element={<BlogPosts setBlogs={setBlogs} />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/users/:id" element={<UserPosts />} />
            <Route path="/blogs/:id" element={<BlogPage />} />
          </Routes>
        </div>
        </>
      )}
    </>
    );
};

export default App;
