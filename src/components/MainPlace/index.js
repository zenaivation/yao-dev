import React, { Component } from 'react'

export class mainPlace extends Component {
  render() {
    const { title, image, place, goTo, lat, lng } = this.props;
    return (
      <div className="mainPlace" onClick={() => goTo(place)}>
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
    )
  }
};


export default mainPlace;