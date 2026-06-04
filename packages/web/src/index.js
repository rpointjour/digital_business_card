import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Components/StyleSheets/AboutMe.css';
import App from './Components/App/App';
import Loader from './Components/Loader';
import AboutMe from './Components/AboutMe';
import Projects from './Components/Projects';
import Connect from './Components/Connect';
import reportWebVitals from './reportWebVitals';

// Import all necessary app components, then render components by Id

const loader = ReactDOM.createRoot(document.getElementById('loader'));
loader.render(<Loader />);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

const about = ReactDOM.createRoot(document.getElementById('about'));
about.render(<AboutMe />);

const projects = ReactDOM.createRoot(document.getElementById('projects'));
projects.render(<Projects />);

const connect = ReactDOM.createRoot(document.getElementById('connect'));
connect.render(<Connect />);

// To measure app performance
reportWebVitals();
