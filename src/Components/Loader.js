import './StyleSheets/Loader.css';

var myVar;

function showPage(){
    document.getElementById('wrapper').style.display="none";
    document.getElementById('loader').style.display = "none";
    //document.getElementById('myPage').style.display="block";
}

function myFunction()
{
    myVar = setTimeout(showPage, 3000);
    return myVar;
}

function Loader(){
    myFunction();
}

export default Loader;