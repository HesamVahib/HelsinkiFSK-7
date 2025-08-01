import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const userSlice = createSlice({
    name: 'user',
    initialState: [],
    reducers: {
        initialize: (state, action) =>action.payload,
        add: (state, action) => {
            state.push(action.payload);
        }
    }
});

export const { add, initialize } = userSlice.actions;

export const initializeUsers = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3005/users');
            // console.log('response: ', response.data);
            dispatch(initialize(response.data));
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
};

export const createUser = (user) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3005/users', user);
            dispatch(add(response.data));
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };
}

export default userSlice.reducer;