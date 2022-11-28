import React from "react";
import './StyleSheets/Projects.css';
import Carousel from "./Carousel";
/* Projects Component
- Includes Carousel Component for react-slick carousel
- Utilizes bootstrap card class
*/
function Projects(){
    return(
        <div className='container-fluid' id="crd_projects">
        <div class="card container-sm" id="projects">
            <h1 className='card-header container-sm bg-dark text-light'>02. Featured Projects</h1>
            <div class="card-body container-sm">
                <Carousel />
                <br />
                <section className="featured text-light"><hr />
                <h3>Turtlebot3 Waffle Pi</h3><br />
                <button type="button"><a href="/Resume/RJP%20Portfolio%20-%20CE_DBC.pdf" target="blank" rel="noreferrer">Description</a></button>
                <br /><br />
                </section><br />
                <div className="stock text-light"><hr />
                <div>
                <h3>Stock App (Android Studio)</h3><br />
                <iframe width="560" height="315" src="https://www.youtube.com/embed/m-GYSwUPJE8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className="stockApp container-sm w-60" allowfullscreen></iframe>
                </div><br /><br />
                <h3>Distance Reader</h3><br />
                <iframe width="560" height="315" src="https://www.youtube.com/embed/w-XhrnkmF6g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className="dReader container-sm w-60" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Projects;