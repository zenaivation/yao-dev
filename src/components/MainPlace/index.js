import React, { PureComponent } from 'react'


const mainPlace = ({ tagline, sub_title, title, image }) => (
  <div className="mainPlace">
    <div className="mainPlace__left">
      <div className="mainPlace__title">
        <h2 className="boldH2 boldH2--white">{title}</h2>
      </div>
      <div className="mainPlace__view">
        <span>view</span>
      </div>
    </div>
    <div className="mainPlace__right" style={{ backgroundImage: `url(${image})` }}></div>
  </div>
);

export default mainPlace;