
import React from "react";
import './App/App.css';
import Home from "./Home";
import { useMediaQuery } from 'react-responsive';


function AppTablet(){
    const Tablet = ({ children }) => {
        const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
        return isTablet ? children : null
      }
    return (
        <>
        <Tablet>
        <Home />
        </Tablet>
        </>
    );
}

export default AppTablet;