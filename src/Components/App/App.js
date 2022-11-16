import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from '../Menu';
import Home from '../Home';
import AboutMe from '../AboutMe';
import Projects from "../Projects";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={<Home />} />
          <Route path="aboutme" element={<AboutMe />} />
          <Route path="projects" element={<Projects/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
