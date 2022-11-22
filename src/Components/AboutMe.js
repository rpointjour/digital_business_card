import './StyleSheets/AboutMe.css';
import Roody from './StyleSheets/Images/Roody Pointjour Oct 2022-8.jpg';
import ReactTooltip from "react-tooltip";

function AboutMe(){
    return(
        <div className='container-mt-3 about'>
            <div className="crdbody">
            <div class="card w-50" id="crd">
            <h1 className='card-header'>01. About Me</h1>
            <div class="card-body">
            <img src={Roody} alt="Roody Pointjour" data-tip data-for="imageTip" className='card-img-top img-thumbnail img-fluid' id="me"/>
            <ReactTooltip id="imageTip" place="right" effect="solid" arrowColor='black'>
                Roody Pointjour
            </ReactTooltip>
            <article className='card-text'>
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
                    developing<br /> innovative software applications for cloud deployment ( <b className="cloud">Cloud-based apps!</b> ). 
                </p>
                <p>
                    Also, here are some of the technologies that I have utililized and worked with recently:
                </p>
            </article>
            </div>
            <ul className="card-text nav">
                <li>JavaScript</li><br />
                <li>React</li><br />
                <li>Node.js</li>
            </ul>
            <ul className="card-text">
                <li>C++</li><br />
                <li>C#</li><br />
                <li>Python</li><br /><br />
            </ul>
    </div>
    </div>
    </div>
    );
}

export default AboutMe;