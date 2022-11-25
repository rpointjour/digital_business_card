import React from "react";
import './App/App.css';
import Home from "./Home";
import { useMediaQuery } from 'react-responsive';


function AppMobile(){
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 767 })
        return isMobile ? children : null
      }
    return (
        <>
        <Mobile>
        <Home />
        </Mobile>
        </>
    );
}

export default AppMobile;