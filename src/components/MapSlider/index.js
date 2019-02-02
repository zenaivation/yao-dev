import React from "react";


const mapSlider = ({ title, image, onClick, status, index }) => (
  <div className="sliderCard" onClick={onClick} >
    <div className="sliderCard__index"><p>{index + 1}</p></div>
    <div className="sliderCard__img" style={{ backgroundImage: `url(${image})` }}></div>
    <div className="sliderCard__content">
      <h2 className="H3">{title}</h2>
      {status ? (<p className="P">Open</p>) : (<p className="P">Closed</p>)}

    </div>
  </div>
)

export default mapSlider;
