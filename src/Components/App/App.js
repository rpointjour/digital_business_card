import React from "react";
import './App.css';
import { BrowserRouter, useLocation } from "react-router-dom";
import { useLayoutEffect } from 'react';
import Home from '../Home';
import Menu from '../Menu';
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
      <Menu/>
      <div className="App">
      <div
        style={{
          transform: `translateY(${scrollDirection === 'up' ? 0 : '-100%'})`
        }}
        className="scroll-fixed-container scroll-fixed-container--top"
      >
        Scrolling up!
      </div>
      <div
        style={{
          transform: `translateY(${scrollDirection === 'down' ? 0 : '100%'})`
        }}
        className="scroll-fixed-container scroll-fixed-container--bottom"
      >
        Scrolling down!
      </div>
    </div>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
