import React from "react";
import './StyleSheets/Projects.css';
import Carousel from "./Carousel";

function Projects(){
    return(
        <div className="container-fluid" id="crd_projects">
            <div className="card" id="projects">
                <h1 className="card-header">02. Featured Projects</h1>
                <br /><br />
                <Carousel />
                <section className="featured">
                <h3>Turtlebot3 Waffle Pi (Leader-Follower)</h3><br />
                <button type="button"><a href="http://localhost:3000/Resume/RJP%20Portfolio%20-%20CE_DBC.pdf" target="blank" rel="noreferrer">Description</a></button>
                <br /><br />
                </section>
                <div className="stock">
                <div>
                <h3>Stock App (Android Studio)</h3><br />
                <iframe width="560" height="315" src="https://www.youtube.com/embed/m-GYSwUPJE8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className="stockApp" allowfullscreen></iframe>
                </div><br /><br />
                <h3>Distance Reader (Embedded System)</h3><br />
                <iframe width="560" height="315" src="https://www.youtube.com/embed/w-XhrnkmF6g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className="dReader" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    );
}

export default Projects;