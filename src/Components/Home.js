import logo from './StyleSheets/Images/logo_dbc.svg';
import './App/App.css';
import SocialMedia from './SocialMedia';
import Summary from './Summary';

function Home(){
    return (
        <>
        <div className="Logo-place">
            <img src={logo} className="App-logo" alt="logo"/>
            <header className="App-header">
                <p>Hi, my name is</p>
                <h1>Roody Pointjour</h1>
                <h1>I am a developer.</h1>
                <a href="mailto:roody.jerry@yahoo.com" rel="noreferrer" className="email">
                roody.jerry@yahoo.com
                </a>
            </header>
        </div>
        <SocialMedia />
        <Summary />
        </>
    );
}

export default Home;