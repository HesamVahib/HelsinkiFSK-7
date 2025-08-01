import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification: (state, action) => action.payload,
    hideNotification: () => null,
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const setNotification = (message, time = 5000) => {
  return async (dispatch) => {
    dispatch(showNotification(message));
    setTimeout(() => {
      dispatch(hideNotification());
    }, time);
  };
};

export default notificationSlice.reducer;
