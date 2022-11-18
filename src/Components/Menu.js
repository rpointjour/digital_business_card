import './StyleSheets/Menu.css';

function Menu(){
    return(
        <nav className="menu">
            <ul>
            <li><a href="localhost:3000/src/Components/Resume/Roody-Pointjour-Resume.pdf" className="Resume">Resume</a></li>
            <li><a href="#contact">04. Contact</a></li>
            <li><a href="#dev">03. In Development</a></li>
            <li><a href="#projects">02. Projects</a></li>
            <li><a className="active" href="#about">01. About</a></li>
            </ul>
        </nav>
    );
}

export default Menu;