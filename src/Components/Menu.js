import './StyleSheets/Menu.css';
import {Link}from 'react-scroll';
import{Outlet} from "react-router-dom";

function Menu(){
    var Scroll = require('react-scroll');
    var scroll = Scroll.animateScroll;

    scroll.scrollToTop("#root");
    return(
        <>
        <nav>
            <ul className="menu">
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
            
            </ul>
        </nav>
        <Outlet />
        </>
    );
}

export default Menu;