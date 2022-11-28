import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Components/StyleSheets/AboutMe.css';
import App from './Components/App/App';
import Loader from './Components/Loader';
import AboutMe from './Components/AboutMe';
import Projects from './Components/Projects';
import reportWebVitals from './reportWebVitals';

const loader = ReactDOM.createRoot(document.getElementById('loader'));
loader.render(<Loader />);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

const about = ReactDOM.createRoot(document.getElementById('about'));
about.render(<AboutMe />);

const projects = ReactDOM.createRoot(document.getElementById('projects'));
projects.render(<Projects />);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
