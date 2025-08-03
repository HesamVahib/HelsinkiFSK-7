import React, { useReducer, createContext } from 'react';

const NotificationContext = createContext();

const initialState = [];

function reducer(state, action) {
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            return [...state, action.payload];
        case 'REMOVE_NOTIFICATION':
            return state.filter(notification => notification.id !== action.payload.id);
        default:
            return state;
    }
}

function NotificationProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <NotificationContext.Provider value={{ notifications: state, dispatch }}>
            {children}
        </NotificationContext.Provider>
    );
}

export { NotificationContext, NotificationProvider };