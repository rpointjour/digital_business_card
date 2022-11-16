import './StyleSheets/Menu.css';
import { Outlet, Link } from "react-router-dom";

function Menu(){

    return(
        <>
        <nav>
            <ul className="menu">
            <li className="item"><a href="http://localhost:3000/Resume/Roody-Pointjour-Resume.pdf" target="_blank" rel="noreferrer">Resume</a></li>
            <li className="item"><Link to="/projects">Projects</Link></li>
            <li className="item"><Link to="/aboutme">About</Link></li>
            <li className='item'><Link to="/">Home</Link></li>
            </ul>
        </nav>

        <Outlet />
        </>
    );
}

export default Menu;