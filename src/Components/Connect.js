import React from "react";
import "./StyleSheets/Connect.css";

function Connect(){
    return(
        <>
        <footer className="connect container-fluid">
            <h3>03. Don't Be Afraid To Reach Out!</h3><br />
            <h2><button type="button"> <a href="mailto:roody.jerry@yahoo.com" rel="noreferrer">
                Let's Connect
                </a></button></h2><br />
            <div className="af">
            <a href="https://www.linkedin.com/in/roody-pointjour/" className="fa fa-linkedin" target="_blank" rel="noreferrer"><span id="linked">.</span></a>
            <a href="https://github.com/rpointjour" className="fa fa-github" target="_blank" rel="noreferrer"><span id="git">.</span></a>
            <a href="https://www.youtube.com/channel/UC5jL_2GLNFFTLTuoToK9vIg" className="fa fa-youtube" target="_blank" rel="noreferrer"><span id="tube">.</span></a>
            </div>
            <p className="credits">Built & Designed by Roody Pointjour</p>
        </footer>
        </>
    )
}

export default Connect;