import React from "react";
import Slider from "react-slick";
import turtlebot3 from "./StyleSheets/Images/turtlebot3_waffle_pi.jpg"

export default function Carousel() {
  var settings = {
    dots: true,
    arrows:true,
    infinite: true,
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
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
    </Slider>
    </>
  );
}