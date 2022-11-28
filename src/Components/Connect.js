import React from "react";
import "./StyleSheets/Connect.css";
/*Connect Component
- Utilized for App Footer
- Includes bootstrap toast class for toast message
*/
function Connect(){
    return(
        <>
        <footer className="connect container-fluid">
            <h3>03. Don't Be Afraid To Reach Out! 
            <div class="toast bg-dark text-light show mytoast">
  <div class="toast-header bg-secondary text-light">
    Thanks for visiting my page!
    <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
  </div>
  <div class="toast-body">
    Looking forward to hearing from you.
  </div>
</div>
                </h3><br />
            <h2><button type="button" className="contact"> <a href="mailto:roody.jerry@yahoo.com" rel="noreferrer">
                Let's Connect
                </a></button></h2><br />
            <p className="credits">Built & Designed by Roody Pointjour</p>
        </footer>
        </>
    )
}

export default Connect;