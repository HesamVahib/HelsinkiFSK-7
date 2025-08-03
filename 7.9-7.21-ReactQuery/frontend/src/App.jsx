import { useState, useEffect } from 'react';
import LoginForm from './Components/LoginForm';
import BlogPosts from './Components/BlogPosts';
import { useBlogPosts } from './hooks/useBlogPosts';



const App = () => {

  const [user, setUser] = useState(null);
  const [updatedBlog, setBlogs] = useState([]);
  
  // const { data: blogPosts, isLoading, error } = useBlogPosts();
  // if (isLoading) console.log('Loading blog posts...');
  // else if (error) console.error('Error fetching blog posts:', error);
  // else console.log('Blog posts:', blogPosts);

  useEffect(() => {
    
    const loggedUserJSON = window.localStorage.getItem('loggedUser');

    if (loggedUserJSON && loggedUserJSON !== 'undefined') {
      try {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
      } catch (error) {
        console.error('Error parsing logged user:', error);
      }
    }

  }, []);


  return (
    <>
    {user === null ?
    <LoginForm setUser={setUser} />
    : <BlogPosts user={user} setUser={setUser} updatedBlog={updatedBlog} setBlogs={setBlogs} />}
  </>);
};

export default App;
