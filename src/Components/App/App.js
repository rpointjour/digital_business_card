import './App.css';
import { BrowserRouter, useLocation } from "react-router-dom";
import { useLayoutEffect } from 'react';
import Home from '../Home';
import Menu from '../Menu';


const Wrapper = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 10);
  }, [location.pathname]);
  return children
} 

function App() {
  return (
    <BrowserRouter>
    <Wrapper>
      <Home />
      <Menu />
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
