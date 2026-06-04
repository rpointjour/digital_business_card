import React from "react";
import './StyleSheets/SocialMedia.css';
// Return Social Media icons using Unicode
function SocialMedia(){
    return (
        <div>
           <a href="https://www.linkedin.com/in/roody-pointjour/" target="_blank" rel="noreferrer"><i 
           style={
            {fontSize:"40px",
            }} class="fa linked">&#xf0e1;</i></a>
           <a href="https://github.com/rpointjour" target="_blank" rel="noreferrer"><i 
           style={
            {fontSize:"40px", 
                color:"black"
            }} class="fa git">&#xf09b;</i></a>
            <a href="https://www.youtube.com/channel/UC5jL_2GLNFFTLTuoToK9vIg" target="_blank" rel="noreferrer"><i 
           style={
            {fontSize:"40px", 
            color:"red"
            }} class="fa youtube">&#xf16a;</i></a>
        </div>
    )
}

export default SocialMedia;