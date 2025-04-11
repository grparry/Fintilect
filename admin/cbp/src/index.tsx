import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Logger } from './utils/logger';

// Initialize logger once at application startup
Logger.initialize().catch((error: unknown) => {
  // Silent fail - logging is a non-critical feature
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(logger.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();