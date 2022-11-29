import './StyleSheets/AboutMe.css';
import Roody from './StyleSheets/Images/Roody Pointjour Oct 2022-8.jpg';
import ReactTooltip from "react-tooltip";
/*AboutMe Component
- Styled CSS according to different screen sizes
- Used media queries to align text more appropriately
- Utilized ReactTooltip to display a tooltip over my image
- Included bootstrap class list-group for technologies section
*/
function AboutMe(){
    return(
    <div className='container-fluid'
    style={{
        paddingTop:"100px"
    }}
    >
        <div class="card container-sm bg-secondary" id="crd">
            <h1 className='card-header container-sm text-light'>01. About Me</h1>
            <div class="card-body container-sm">
                <img src={Roody} alt="Roody Pointjour" data-tip data-for="imageTip" className='card-img-top img-thumbnail img-fluid' id="me"/>
                <ReactTooltip id="imageTip" place="right" effect="solid" arrowColor='black'>
                Nice to meet you!
                </ReactTooltip>
                <br />
                <h4 className='card-title container-sm text-light'
                style={{
                    paddingTop:"6px"
                }}
                >Roody Pointjour</h4><br />
                <article className='container-sm'>
                    <p className='card-text text-light'>
                    <span className="hello">Hello! My name is Roody and I have a passion
                    for developing cool projects. My interest
                    in software development started back in 2019 when I took my first course
                    in Object-Oriented programming where I learned the Java Programming language.</span><br />
                    </p>
                    <p className='card-text text-light hello'>
                        <br />
                    As of now, I have the experience of working as a Front-End developer intern 
                    for an iOS and Android based application. My primary focus these days revolves around developing innovative software applications for cloud deployment<span className="period">.</span> <b className="text-warning cloud">(Cloud-based apps!)</b>
                    </p>
                    <p className='card-text text-light hello'>
                    <br />Recently I have been working with these technologies:
                    </p>
                    <ul className=' list-group list-group-flush' id="lst">
                    <li className='list-group-item list-group-item-success'></li>
                    <li className='list-group-item list-group-item-action list-group-item-warning'>JavaScript</li>
                    <li className='list-group-item active'>React</li>
                    <li className='list-group-item list-group-item-action list-group-item-danger'>Node.js</li>
                    <li className='list-group-item list-group-item-action list-group-item-dark'>C++</li>
                    <li className='list-group-item list-group-item-action list-group-item-success'>C#</li>
                    <li className='list-group-item list-group-item-action list-group-item-info'>Python</li>
                    </ul>
                    </article>
            </div>
        </div>
    </div>
    
    );
}

export default AboutMe;