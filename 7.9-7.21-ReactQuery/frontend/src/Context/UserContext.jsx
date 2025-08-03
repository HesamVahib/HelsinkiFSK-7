import { createContext, useContext, useReducer } from "react";

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload;
        case 'LOGOUT':
            return null;
        case 'UPDATE_USER':
            return { ...state, ...action.payload };
        default:
            return state;  
    }
}

const UserContext = createContext();
const UserDispatchContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, dispatch] = useReducer(reducer, null);

    return (
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

export const useUserDispatch = () => {
    const context = useContext(UserDispatchContext);
    if (context === undefined) {
        throw new Error('useUserDispatch must be used within a UserProvider');
    }
    return context;
}
