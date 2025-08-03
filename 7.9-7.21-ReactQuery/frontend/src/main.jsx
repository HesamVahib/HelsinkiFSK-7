import ReactDOM from 'react-dom/client';
import App from './App';
import { NotificationProvider } from './Context/NotificationContext'
import ReactQueryProvider from './providers/ReactQueryProvider';
import { UserProvider } from './Context/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
        <Router>
            <NotificationProvider>
                <ReactQueryProvider>
                    <UserProvider>
                        <App />
                    </UserProvider>
                </ReactQueryProvider>
            </NotificationProvider>
        </Router>
);
