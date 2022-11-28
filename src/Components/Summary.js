import React from "react";
import './App/App.css';
function Summary(){
/*Return app summary with specified classes
Resume link in this section is only visible for mobile screens*/
return (
    <div className="App-summary container-fluid">
      <a href="/Resume/Roody-Pointjour-Resume.pdf" id="resume" className="btn btn-link active btn-warning text-dark btn-outline-warning">Resume</a>
      <article>
        <h3 className="facts">
          <div>
          Computer Engineer specializing in designing, building, 
          <br />and deploying advanced systems and applications.
          <br />Currently, I am
          focused on building innovative <br />software technology.
          </div>
          </h3>
      </article>
    </div>
  );

}

export default Summary;