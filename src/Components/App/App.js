import React from "react";
import './App.css';
import { BrowserRouter, useLocation } from "react-router-dom";
import { useLayoutEffect } from 'react';
import Home from '../Home';
import Menu from '../Menu';
import AppLogo from '../StyleSheets/Images/logo_dbc.svg';
import {Link} from "react-scroll";
import useScrollDirection from '../useScrollDirection';
import '../StyleSheets/Scroll.css';


const Wrapper = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 10);
  }, [location.pathname]);
  return children
} 

function App() {
  const scrollDirection = useScrollDirection();
  return (
    <BrowserRouter>
    <Wrapper>
      <Home />
      <Menu />
      <div>
      <div
        style={{
          transform: `translateY(${scrollDirection === 'up' ? 0 : '-100%'})`
        }}
        className="scroll-fixed-container scroll-fixed-container--top"
      >
         <img src={AppLogo} className="Page-logo" alt="logo"/>
        <nav>
            <ul>
            <li className="item"><a href="http://localhost:3000/Resume/Roody-Pointjour-Resume.pdf" target="_blank" rel="noreferrer">Resume</a></li>
            <li className="item"><Link 
            spy={true} 
            smooth={true}
            offset={5} 
            duration={100} 
            to="projects" 
            href="#projects"
            >Projects</Link></li>
            <li className="item"><Link 
            spy={true} 
            smooth={true} 
            offset={5} 
            duration={100} 
            to="about" 
            href="#about">About</Link></li>
              <li className="item"><Link 
            spy={true} 
            smooth={true} 
            offset={0} 
            duration={100} 
            to="root" 
            href="#about">Home</Link></li>
            
            </ul>
        </nav>
      </div>
    </div>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
