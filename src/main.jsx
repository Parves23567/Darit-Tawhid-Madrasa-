import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          fontFamily: "'Hind Siliguri', sans-serif",
          fontSize: '14px',
        },
        success: {
          style: { background: '#16a34a', color: '#fff' },
          iconTheme: { primary: '#fff', secondary: '#16a34a' },
        },
        error: {
          style: { background: '#dc2626', color: '#fff' },
          iconTheme: { primary: '#fff', secondary: '#dc2626' },
        },
      }}
    />
  </React.StrictMode>
);
