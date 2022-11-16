import './StyleSheets/Projects.css';
import turtlebot from './StyleSheets/Images/turtlebot3_waffle_pi.jpg';
import Helmet from "react-helmet";

function Projects(){
    return(
        <div className="projects">
                <h2>02. Projects I've Worked On Before</h2><br /><br />
                <img src= {turtlebot} alt="Turtlebot3 Waffle Pi" className='turtle' />
                <section className="featured">
                <h4>Featured Project</h4>
                <h3>Turtlebot3 Waffle Pi (Leader-Follower)</h3><br />
                <button type="button"><a href="http://localhost:3000/Resume/RJP%20Portfolio%20-%20CE_DBC.pdf" target="blank" rel="noreferrer">Description</a></button>
                </section>
                <Helmet bodyAttributes={{style: 'background-color : #d3d3d3'}}/>
        </div>
    );
}

export default Projects;