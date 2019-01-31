import React, { PureComponent } from 'react'


const BookmarkRow = ({ image, title }) => (
  <div className="bookmark-column">
    <div className="bookmark-row">
      <div className="bookmark-row__image" style={{ backgroundImage: `url(${image})` }}></div>
      <h3 className="H3 H3--black">{title} </h3>
    </div>
  </div>
);

export default BookmarkRow;