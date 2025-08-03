import ReactDOM from 'react-dom/client';
import App from './App';
import { NotificationProvider } from './Context/NotificationContext'
import ReactQueryProvider from './Providers/ReactQueryProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
        <NotificationProvider>
            <ReactQueryProvider>
                <App />
            </ReactQueryProvider>
        </NotificationProvider>
);
