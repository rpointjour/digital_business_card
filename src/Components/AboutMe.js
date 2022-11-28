import './StyleSheets/AboutMe.css';
import Roody from './StyleSheets/Images/Roody Pointjour Oct 2022-8.jpg';
import ReactTooltip from "react-tooltip";

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
                    Hello! My name is Roody and I have a passion
                    for developing cool and exciting <span id="proj" style={{position:"relative", left:"12px"}}>projects.</span> <br /><br />My interest
                    in software development started back in 2019 when I took my first course
                    in Object-Oriented programming <span id='java' style={{position:"relative", left:"8px"}}>where I learned the Java Programming</span><br /><span id='lang' style={{position:"relative", left:"12px"}}>language.</span>
                    </p>
                    <p className='card-text text-light'>
                        <br />
                        <span id='as' style={{position:"relative", right:"8px"}}>As of now, I have the experience of</span> working as a Front-end developer intern 
                    for an iOS and Android based application.<br /><br/> My primary focus these days revolves <span id='around' style={{position:"relative", right:"8px"}}>around developing innovative</span> software <span id='soft' style={{position:"relative", left:"12px"}}>applications for cloud deployment</span><br /><b className="cloud text-warning">( Cloud-based apps! )</b>
                    </p>
                    <p className='card-text text-light'>
                    <br /><span id='here' style={{whiteSpace:"nowrap", textAlign:"left"}}>Here are some of the technologies</span><span id='tech'  style={{whiteSpace:"nowrap", textAlignLast:"left"}}>that I have utililized and worked with:</span>
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