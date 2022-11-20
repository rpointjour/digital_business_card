import React from "react";
import './StyleSheets/Projects.css';
import Carousel from "./Carousel";

function Projects(){
    return(
        <div className="projects">
                <h1>02. Featured Projects</h1>
                <br /><br />
                <Carousel className="slick-prev slick-next" />
                <section className="featured">
                <h3>Turtlebot3 Waffle Pi (Leader-Follower)</h3><br />
                <button type="button"><a href="http://localhost:3000/Resume/RJP%20Portfolio%20-%20CE_DBC.pdf" target="blank" rel="noreferrer">Description</a></button>
                <br /><br />
                <h3>Stock App (Android Studio)</h3><br />
                <h3>Distance Reader (Embedded System)</h3><br />
                </section>
        </div>
    );
}

export default Projects;