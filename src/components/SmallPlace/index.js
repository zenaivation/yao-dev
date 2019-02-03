import React, { Component } from 'react'

export class SmallPlace extends Component {
  render() {
    const { image, title, description, lat, lng, goTo, place } = this.props;
    return (
      <button className="smallPlace" onClick={() => goTo(place)}>
        <div className="smallPlace__image" style={{ backgroundImage: `url(${image})` }}></div>
        <div className="smallPlace__content">
          <h5 className="boldH5 boldH5--black">{title}</h5>
          <p className="P P--black">Lorem ipsum</p>
        </div>
      </button>
    );
  }
}

export default SmallPlace;
