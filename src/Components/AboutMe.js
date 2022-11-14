import './StyleSheets/AboutMe.css';
import Roody from './StyleSheets/Images/Roody Pointjour Oct 2022-8.jpg';
function AboutMe(){
    return(
        <div className="about">
            <img src={Roody} alt="Roody Pointjour" className="me" />
            <h1>01. About Me</h1>
            <article>
                <p>
                    Hello! My name is Roody and I have a passion
                    for developing cool and exciting projects. <br />My initerest
                    in software development started back in 2019 when I took my first couse
                    in<br />
                    (2019) - Object-Oriented programming where I learned the Java Programming language.
                </p>
                <p>
                    Fast-forward to today, I've had the experience to work as an Front-end developer intern<br /> 
                    for an iOS and Android based application. My primary focus these days revolves around<br />
                    developing innovative software applications for cloud deployment (<b className="cloud">Cloud-based apps!</b>). 
                </p>
                <p>
                    Also, here are some of the technologies that I have utililized and worked with recently:
                </p>
            </article>
            <ul className="tech">
        <li>JavaScript</li><br />
        <li>React</li><br />
        <li>Node.js</li>
    </ul>
    <ul className="mtech">
        <li>C++</li><br />
        <li>C#</li><br />
        <li>Python</li>
    </ul>
        </div>
    
    );
}

export default AboutMe;