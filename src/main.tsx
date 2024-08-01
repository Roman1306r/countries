import ReactDOM from 'react-dom/client';
import './index.css';
import { AppProvider } from './components/Context/Context';
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<AppProvider><App /></AppProvider>);
