import React from "react";
import Slider from "react-slick";
import turtlebot3 from "./StyleSheets/Images/turtlebot3_waffle_pi.jpg";
import stockHome from "./StyleSheets/Images/stock_home.JPG";
import dReader from "./StyleSheets/Images/distance_reader.JPG";

export default function Carousel() {
  var settings = {
    dots: true,
    arrows:true,
    infinite: true,
    fade:true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <>
    <Slider {...settings}
    style={
    {
        position:"relative",
        right:"328px"
    }}
    >
      <div>
        <img src={turtlebot3} alt="Turtlebot3" 
        style={
        {
            width:275, 
            height:400, 
            display:"block",
            marginLeft:"auto",
            marginRight:"auto",
            borderRadius:"5px"
        }} 
        />
        <h3>Turtlebot3 Waffle Pi (Leader-Follower)</h3>
      </div>
      <div>
      <img src={stockHome} alt="Stock App" 
        style={
        {
            width:275, 
            height:400, 
            display:"block",
            marginLeft:"auto",
            marginRight:"auto",
            borderRadius:"5px"
        }} 
        />
        <h3>My Stock App</h3>
      </div>
      <div>
      <img src={dReader} alt="Distance Reader" 
        style={
        {
            width:275, 
            height:400, 
            display:"block",
            marginLeft:"auto",
            marginRight:"auto",
            borderRadius:"5px"
        }} 
        />
        <h3>Distance Reader (Embedded System)</h3>
      </div>
    </Slider>
    </>
  );
}