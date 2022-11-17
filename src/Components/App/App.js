import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect } from 'react';
import Home from '../Home';
import Menu from '../Menu';
import Projects from "../Projects";


const Wrapper = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
} 

function App() {
  return (
    <BrowserRouter>
    <Wrapper>
      <Home />
      <Menu />
      <Routes>
          <Route path="/projects" element={<Projects />}>
          </Route>
      </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
