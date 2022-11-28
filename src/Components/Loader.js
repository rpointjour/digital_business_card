import './StyleSheets/Loader.css';

var myLoader;
// Function to display page without wrapper or loader
function showPage(){
    document.getElementById('wrapper').style.display="none";
    document.getElementById('loader').style.display = "none";
    document.getElementById('myPage').style.display="block";
}
// Function to set time out on loader
function showLoader()
{
    myLoader = setTimeout(showPage, 3000);
    return myLoader;
}
// Loader component to display the loader
function Loader(){
    showLoader();
}

export default Loader;