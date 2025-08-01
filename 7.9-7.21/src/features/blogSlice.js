import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://localhost:3005/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    appendBlog: (state, action) => {
      state.push(action.payload);
    },
    likeBlog: (state, action) =>
      state.map((blog) =>
        blog.id === action.payload.id
          ? { ...blog, likes: blog.likes + 1 }
          : blog
      ),
    deleteBlog: (state, action) =>
      state.filter((blog) => blog.id !== action.payload.id),
  },
});

export const { setBlogs, appendBlog, likeBlog, deleteBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await axios.get(baseUrl);
    dispatch(setBlogs(blogs.data));
  };
};

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const response = await axios.post(baseUrl, newBlog);
    dispatch(appendBlog(response.data));
  };
};

export const eliminateBlog = (blog) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${baseUrl}/${blog.id}`);
      dispatch(deleteBlog(blog));
    } catch (e) {
      console.error('error: ', e);
    }
  };
};

export const likedBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    try {
      await axios.patch(`${baseUrl}/${blog.id}`, updatedBlog);
      dispatch(likeBlog(updatedBlog));
    } catch (e) {
      console.log('error: ', e);
    }
  };
};

export default blogSlice.reducer;
