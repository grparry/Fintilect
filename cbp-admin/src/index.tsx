import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

async function startApp() {
  // Initialize MSW in development mode
  if (process.env.NODE_ENV === 'development') {
    try {
      const { initMocks } = await import('./mocks');
      await initMocks();
      console.log('MSW initialized successfully');
    } catch (error) {
      console.warn('Failed to initialize MSW:', error);
    }
  }

  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

startApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();