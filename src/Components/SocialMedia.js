import React from "react";
import './StyleSheets/SocialMedia.css';

function SocialMedia(){
    return (
        <div className = "fa">
            <a href="https://www.linkedin.com/in/roody-pointjour/" className="fa fa-linkedin" target="_blank" rel="noreferrer"><span id="linked">.</span></a>
            <a href="https://github.com/rpointjour" className="fa fa-github" target="_blank" rel="noreferrer"><span id="git">.</span></a>
            <a href="https://www.youtube.com/channel/UC5jL_2GLNFFTLTuoToK9vIg" className="fa fa-youtube" target="_blank" rel="noreferrer"><span id="tube">.</span></a>
        </div>
    )
}

export default SocialMedia;