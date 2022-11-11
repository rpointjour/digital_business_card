import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Logo from './Logo';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const logo = ReactDOM.createRoot(document.getElementById('logo'));
logo.render(
  <React.StrictMode>
    <Logo />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
