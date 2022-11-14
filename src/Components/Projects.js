import './StyleSheets/Projects.css';
import turtlebot from './StyleSheets/Images/turtlebot3_waffle_pi.jpg';

function Projects(){
    return(
        <div className="projects">
                <h2>02. Projects I've Worked On Before</h2><br /><br />
                <img src= {turtlebot} alt="Turtlebot3 Waffle Pi" className='turtle' />
                <h4>Featured Project</h4>
        </div>
    );
}

export default Projects;