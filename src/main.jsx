import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import App from './App';
import './styles/index.css';

// Anti-copyable guard: prevent copy unless focused on input or textarea
document.addEventListener('copy', (e) => {
  const activeEl = document.activeElement;
  const isInput = activeEl && (
    activeEl.tagName === 'INPUT' || 
    activeEl.tagName === 'TEXTAREA' || 
    activeEl.isContentEditable
  );
  if (!isInput) {
    e.preventDefault();
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PortfolioProvider>
          <App />
        </PortfolioProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
