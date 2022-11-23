import React from "react";
import './StyleSheets/SocialMedia.css';

function SocialMedia(){
    return (
        <div>
           <a href="https://www.linkedin.com/in/roody-pointjour/" target="_blank" rel="noreferrer"><i style={{fontSize:"40px"}} class="fa">&#xf0e1;</i></a>
           <a href="https://github.com/rpointjour" target="_blank" rel="noreferrer"><i 
           style={
            {fontSize:"40px", 
            color:"black",
            position:"relative",
            top:"70px",
            right:"36px"
            }} class="fa">&#xf09b;</i></a>
            <a href="https://www.youtube.com/channel/UC5jL_2GLNFFTLTuoToK9vIg" target="_blank" rel="noreferrer"><i 
           style={
            {fontSize:"40px", 
            color:"red",
            position:"relative",
            top:"135px",
            right:"71px"
            }} class="fa">&#xf16a;</i></a>
        </div>
    )
}

export default SocialMedia;