import React from "react";
import "../Components/StyleSheets/Menu.css";
import {Link}from 'react-scroll';
/* Menu Component
- Utilizes Link hook from react-scroll for menu navigation items
- Enabled smooth scrolling through page
- Menu is only visible for device screens larger than mobile
*/
function Menu(){
   
    return(
        <>
        <nav>
            <ul className=" menu">
            <li className="item"><Link 
            spy={true} 
            smooth={true} 
            offset={0} 
            duration={100} 
            to="root" 
            href="#about">Home</Link></li>
             <li className="item"><Link 
            spy={true} 
            smooth={true} 
            offset={95} 
            duration={100} 
            to="about" 
            href="#about">About</Link></li>
            <li className="item"><Link 
            spy={true} 
            smooth={true}
            offset={245} 
            duration={100} 
            to="projects" 
            href="#projects"
            >Projects</Link></li>
            <li className="item"><Link 
            spy={true} 
            smooth={true}
            offset={350} 
            duration={100} 
            to="connect" 
            href="#connect"
            >Connect</Link></li>
            <li className="item"><a href="/Resume/Roody-Pointjour-Resume.pdf" target="_blank" rel="noreferrer">Resume</a></li>
            </ul>
        </nav>
        </>
    );
}

export default Menu;