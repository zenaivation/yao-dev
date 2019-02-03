import React, { Component } from 'react'

export class SmallPlace extends Component {
  render() {
    const { image, title, description, lat, lng, goTo } = this.props;
    const place = {
      image,
      title,
      description,
      lat,
      lng
    }
    return (
      <button onClick={() => goTo(place)}>
        <div className="smallPlace">
          <div className="smallPlace__image" style={{ backgroundImage: `url(${image})` }}></div>
          <div className="smallPlace__content">
            <h5 className="boldH5 boldH5--black">{title}</h5>
            <p className="P P--black">Lorem ipsum</p>
          </div>
        </div>
      </button>
    );
  }
}

export default SmallPlace;
