import './StyleSheets/Menu.css';
import { Outlet, Link } from "react-router-dom";

function Menu(){

    return(
        <>
        <nav>
            <ul className="menu">
            <li className="item"><a href="http://localhost:3000/Resume/Roody-Pointjour-Resume.pdf" target="_blank" rel="noreferrer">Resume</a></li>
            <li className="item"><Link to="/projects">02. Projects</Link></li>
            <li className="item"><Link to="/aboutme">01. About</Link></li>
            <li className='item'><Link to="/">00. Home</Link></li>
            </ul>
        </nav>

        <Outlet />
        </>
    );
}

export default Menu;