import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.jsx'

// Dynamic API URL Configuration
const getApiUrl = () => {
    let url = import.meta.env.VITE_API_URL;
    if (!url && typeof window !== 'undefined') {
        url = window.VITE_API_URL || window._env_?.VITE_API_URL;
    }
    return url;
};

const apiUrl = getApiUrl();
if (apiUrl) {
    const formattedUrl = apiUrl.startsWith('http://') || apiUrl.startsWith('https://') 
        ? apiUrl 
        : `https://${apiUrl}`;
    axios.defaults.baseURL = formattedUrl;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
