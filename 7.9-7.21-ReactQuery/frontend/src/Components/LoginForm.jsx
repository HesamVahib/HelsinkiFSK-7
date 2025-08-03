import { useState } from 'react';
import { Display } from './Display';
import { ErrorDisplay } from './Display';
import { dispatchNotification} from '../Context/NotificationContext';
import { useUserDispatch } from '../Context/UserContext';

const LoginForm = ({ setUser }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = dispatchNotification();
  const userDispatch = useUserDispatch();

  const handleLogin = async event => {

    event.preventDefault();

    if (!username || !password) {
      dispatch({ type: 'ADD_NOTIFICATION', payload: 'Username and password are required' });
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION' });
      }, 5000);
      return;
    }
    console.log('logging in with', username, password);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      console.log('Response status:', response.status);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }

      const user = await response.json();
      userDispatch({ type: 'SET_USER', payload: user });
      // setUser(user);
      setUsername('');
      setPassword('');

      dispatch({ type: 'ADD_NOTIFICATION', payload: 'Login successful!' });
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION' });
      }, 5000);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));

      } catch (exception) {
        const errorMessage = exception.message || 'Wrong username or password';
        dispatch({ type: 'ADD_NOTIFICATION', payload: errorMessage });
        setTimeout(() => {
          dispatch({ type: 'REMOVE_NOTIFICATION' });
        }, 5000);
      }
  };

  return (
    <div>
      <Display tag="h2" text="Log in to application" />
      <ErrorDisplay color="red" />
      <form onSubmit={handleLogin} name="login form">
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            placeholder="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            placeholder="password"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;