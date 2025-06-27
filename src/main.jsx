import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../../styles/variables.css';
import '../../styles/style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
); 

// Register service worker for PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
} 