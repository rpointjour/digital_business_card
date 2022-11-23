import './StyleSheets/AboutMe.css';
import Roody from './StyleSheets/Images/Roody Pointjour Oct 2022-8.jpg';
import ReactTooltip from "react-tooltip";

function AboutMe(){
    return(
    <div className='container-fluid'>
        <div class="card" id="crd">
            <h1 className='card-header'>01. About Me</h1>
            <div class="card-body">
                <img src={Roody} alt="Roody Pointjour" data-tip data-for="imageTip" className='card-img-top img-thumbnail img-fluid' id="me"/>
                <ReactTooltip id="imageTip" place="right" effect="solid" arrowColor='black'>
                Nice to meet you!
                </ReactTooltip>
                <br />
                <h4 className='card-title'
                style={{
                    paddingTop:"6px"
                }}
                >Roody Pointjour</h4><br />
                <article>
                    <p className='card-text'>
                    Hello! My name is Roody and I have a passion
                    for developing cool and exciting projects. <br />My initerest
                    in software development started back in 2019 when I took my first couse
                    in<br />
                    (2019) - Object-Oriented programming where I learned the Java Programming language.
                    </p>
                    <p className='card-text'>
                    As of now, I have the experience of working as a Front-end developer intern 
                    for an iOS<br /> and Android based application. My primary focus these days revolves around
                    developing<br /> innovative software applications for cloud deployment ( <b className="cloud">Cloud-based apps!</b> ). 
                    </p>
                    <p className='card-text'>
                    Also, here are some of the technologies that I have utililized and worked with recently:
                    </p>
                    <ul className=' list-group list-group-flush' id="lst">
                    <li className='list-group-item'></li>
                    <li className='list-group-item'>JavaScript</li>
                    <li className='list-group-item active'>React</li>
                    <li className='list-group-item'>Node.js</li>
                    <li className='list-group-item'>C++</li>
                    <li className='list-group-item'>C#</li>
                    <li className='list-group-item'>Python</li>
                    </ul>
                    </article>
            </div>
        </div>
    </div>
    
    );
}

export default AboutMe;