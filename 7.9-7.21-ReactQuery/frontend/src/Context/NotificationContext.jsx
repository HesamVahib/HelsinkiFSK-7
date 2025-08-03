import { createContext, useReducer, useContext } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return action.payload
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state;
  }
};

export const showNotification = () => {
  const { notification } = useContext(NotificationContext);
  return notification;
};

export const dispatchNotification = () => {
  const { dispatch } = useContext(NotificationContext);
  return dispatch;
};


export const NotificationProvider = ({ children }) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, []);
    
    return (
        <NotificationContext.Provider value={{ notification: notification, dispatch: notificationDispatch }}>
        {children}
        </NotificationContext.Provider>
    );
};

export default NotificationContext