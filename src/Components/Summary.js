import React from "react";
import './App/App.css';
function Summary(){
/*Return app summary with specified classes*/
return (
    <div className="App-summary container-fluid">
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