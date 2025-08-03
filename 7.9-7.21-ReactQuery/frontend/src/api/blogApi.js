export const fetchBlogPosts = async () => {
  const response = await fetch('/api/blogs');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export const createBlogPost = async (newBlog) => {
  const loggedUser = window.localStorage.getItem('loggedUser');
  let token = null;
  if (loggedUser && loggedUser !== 'undefined') {
    try {
      const parsedUser = JSON.parse(loggedUser);
      token = parsedUser.token;
    } catch (error) {
      console.error('Error parsing logged user:', error);
    }
  }

  if (!token) {
    throw new Error('Authorization token is required');
  }
  const response = await fetch('/api/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newBlog),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export const deleteBlogPost = async (blogId) => {

  const loggedUser = window.localStorage.getItem('loggedUser');
  
  let token = null;
  if (loggedUser && loggedUser !== 'undefined') {
    try {
      const parsedUser = JSON.parse(loggedUser);
      token = parsedUser.token;
    } catch (error) {
      console.error('Error parsing logged user:', error);
    }
  }

  if (!token) {
    throw new Error('Authorization token is required');
  }
  
  const response = await fetch(`/api/blogs/${blogId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return { success: true, id: blogId };
}

export const likeBlogPost = async (blogId) => {

  const response = await fetch(`/api/blogs/${blogId}/likes`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};