import React from "react";
import './StyleSheets/Menu.css';
import {Link}from 'react-scroll';

function Menu(){
   

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
        </>
    );
}

export default Menu;