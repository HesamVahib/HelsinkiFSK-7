import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const personSlice = createSlice({
    name: 'person',
    initialState: [],
    reducers: {
        initialize: (state, action) =>action.payload,
        add: (state, action) => {
            state.push(action.payload);
        }
    }
});

export const { add, initialize } = personSlice.actions;

export const initializePersons = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3005/persons');
            console.log('response: ', response.data);
            dispatch(initialize(response.data));
        } catch (error) {
            console.error('Error fetching persons:', error);
        }
    };
};

export const createPerson = (person) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3005/persons', person);
            dispatch(add(response.data));
        } catch (error) {
            console.error('Error creating person:', error);
        }
    };
}

export default personSlice.reducer;