import React, { Component } from 'react';
import bookMarkIcon from '../../images/bookmark-icon.png';
import bookMarkIconFull from '../../images/bookmark-full-icon.png';


const popupPlace = ({ title, description, image, lat, long, onClick, onSaveBookmark, bookmark, name }) => (
  <div className="popup">
    <div className="popup__close" onClick={onClick}></div>
    <div className="popup__image" style={{ backgroundImage: `url(${image})` }}></div>
    <div className="popup__content">
      <div className="popup__content__top">
        <h2 className="boldH2 boldH2--big">{title}</h2>
        {bookmark ? (
          <img src={bookMarkIconFull} onClick={onSaveBookmark} />
        ) : (
            <img src={bookMarkIcon} onClick={onSaveBookmark} />
          )
        }
      </div>
      <p className="P"> Praesent ut ligula non mi varius sagittis. Phasellus ullamcorper ipsum rutrum nunc. Sed libero. Donec posuere vulputate arcu.</p>
    </div>
    <div className="popup__button">
      <a href={`https://www.google.com/maps/search/?api=1&query=${name}`} target="_blank" rel="noopener noreferrer">
        TAKE ME THERE</a>
    </div>
  </div>
);

export default popupPlace;