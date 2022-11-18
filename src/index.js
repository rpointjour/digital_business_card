import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Components/App/App';
import Logo from './Components/Logo';
import SocialMedia from './Components/SocialMedia';
import Loader from './Components/Loader';
import Menu from './Components/Menu';
import reportWebVitals from './reportWebVitals';

const summary = ReactDOM.createRoot(document.getElementById('summary'));
summary.render(
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

const social = ReactDOM.createRoot(document.getElementById('social'));
social.render(
  <React.StrictMode>
    <SocialMedia />
  </React.StrictMode>
)

const loader = ReactDOM.createRoot(document.getElementById('loader'));
loader.render(
  <React.StrictMode>
    <Loader />
  </React.StrictMode>
)

const menu = ReactDOM.createRoot(document.getElementById('menu'));
menu.render(
  <React.StrictMode>
    <Menu />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
