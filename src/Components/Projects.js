import './StyleSheets/Projects.css';
import turtlebot from './StyleSheets/Images/turtlebot3_waffle_pi.jpg';
function Projects(){
    return(
        <div className="projects">
                <h1>02. Past Projects</h1>
                <br /><br />
                <img src= {turtlebot} alt="Turtlebot3 Waffle Pi" className='turtle' />
                <section className="featured">
                <h4>Featured Project</h4>
                <h3>Turtlebot3 Waffle Pi (Leader-Follower)</h3><br />
                <button type="button"><a href="http://localhost:3000/Resume/RJP%20Portfolio%20-%20CE_DBC.pdf" target="blank" rel="noreferrer">Description</a></button>
                </section>
        </div>
    );
}

export default Projects;