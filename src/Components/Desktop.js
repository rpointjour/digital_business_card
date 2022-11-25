import React from "react";
import './App/App.css';
import Home from "./Home";
import { useMediaQuery } from 'react-responsive';


function AppDesktop(){
    const Desktop = ({ children }) => {
        const isDesktop = useMediaQuery({ minWidth: 992 })
        return isDesktop ? children : null
      }
    return (
        <>
        <Desktop>
        <Home />
        </Desktop>
        </>
    );
}

export default AppDesktop;