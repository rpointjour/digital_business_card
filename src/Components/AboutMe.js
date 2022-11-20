import './StyleSheets/AboutMe.css';
import Roody from './StyleSheets/Images/Roody Pointjour Oct 2022-8.jpg';

function AboutMe(){
    return(
        <>
        <div className="about">
            <img src={Roody} alt="Roody Pointjour" />
            <h1 className='details'>01. About Me</h1>
            <article className='details'>
                <p>
                    Hello! My name is Roody and I have a passion
                    for developing cool and exciting projects. <br />My initerest
                    in software development started back in 2019 when I took my first couse
                    in<br />
                    (2019) - Object-Oriented programming where I learned the Java Programming language.
                </p>
                <p>
                    As of now, I have the experience of working as a Front-end developer intern 
                    for an iOS<br /> and Android based application. My primary focus these days revolves around
                    developing<br /> innovative software applications for cloud deployment (<b className="cloud">Cloud-based apps!</b>). 
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
    <ul className="mtech font-effect-fire">
        <li>C++</li><br />
        <li>C#</li><br />
        <li>Python</li><br /><br />
    </ul>
        </div>
        </>
    );
}

export default AboutMe;