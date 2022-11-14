import './StyleSheets/Menu.css';

function getResume(){
    const resume = document.querySelector('a');

    const request = new Request('Roody-Pointjour-Resume.pdf');/*C:\Users\rpg20\DigitalBusCard\my-react-app\src\Components\Resume\*/
    // Fetch API
    fetch (request)
    .then(response => response.blob())
    .then(display =>{
        const objUrl = URL.createObjectURL(display);
        resume.href = objUrl;
    });
}

function Menu(){
    return(
        <nav>
            <ul className="menu">
            <li className="item"><a href="localhost:3000/src/Components/Roody-Pointjour-Resume.pdf" className="Resume" onClick={getResume()}>Resume</a></li>
            <li className="item"><a href="#contact">04. Contact</a></li>
            <li className="item"><a href="#dev">03. In Development</a></li>
            <li className="item"><a href="#projects">02. Projects</a></li>
            <li className="item"><a className="active" href="#about">01. About</a></li>
            </ul>
        </nav>
    );
}

export default Menu;