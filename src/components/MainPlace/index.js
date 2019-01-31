import React, { PureComponent } from 'react'


const mainPlace = ({ tagline, sub_title, title, image }) => (
  <div className="mainPlace">
    <div className="mainPlace__left">
      <div className="mainPlace__tagline">
        <h5 className="boldH5 boldH5--white">Tagline</h5>
      </div>
      <div className="mainPlace__title">
        <p className="H5 H5--white">Sub title</p>
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