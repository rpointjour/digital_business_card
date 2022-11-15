import './StyleSheets/Menu.css';

function Menu(){

    return(
        <nav>
            <ul className="menu">
            <li className="item"><a href="http://localhost:3000/Resume/Roody-Pointjour-Resume.pdf" target="_blank" rel="noreferrer">Resume</a></li>
            <li className="item"><a href="#contact">04. Contact</a></li>
            <li className="item"><a href="#dev">03. In Development</a></li>
            <li className="item"><a href="#projects">02. Projects</a></li>
            <li className="item"><a className="active" href="#about">01. About</a></li>
            </ul>
        </nav>
    );
}

export default Menu;