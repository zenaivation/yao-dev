import React, { PureComponent } from 'react'


const smallPlace = ({ image, title, description }) => (
  <div className="smallPlace">
    <div className="smallPlace__image" style={{ backgroundImage: `url(${image})` }}></div>
    <div className="smallPlace__content">
      <h5 className="boldH5 boldH5--black">{title}</h5>
      <p className="P P--black">Lorem ipsum</p>
    </div>
  </div>
);

export default smallPlace;