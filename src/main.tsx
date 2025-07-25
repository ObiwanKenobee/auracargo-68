
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import { MockAuthProvider } from './contexts/MockAuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <MockAuthProvider>
        <App />
      </MockAuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
