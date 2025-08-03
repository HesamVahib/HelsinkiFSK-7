import { showNotification } from "../Context/NotificationContext";

const Display = ({ tag: Tag, text, children }) => {
  return <Tag>{text || children}</Tag>;
};


const ErrorDisplay = ({ color }) => {
  
  const notification = showNotification();

  const errorStyle = {
    color: `${color}`,
    margin: '10px 0',
    backgroundColor: '#c1c1c1ff',
    padding: '10px',
    border: `2px solid ${color}`,
  };
  return ( notification && notification.length > 0) ? (
    <h2
      style={errorStyle}
    >
      {notification}
    </h2>
  ) : null;
};

export { Display, ErrorDisplay };
