import React, { PureComponent } from 'react'


const newsBlock = ({ news_title, news_description }) => (
  <div className="newsBlock">
    <h2 className="boldH3 H3--white">{news_title}</h2>
  </div>
);

export default newsBlock;