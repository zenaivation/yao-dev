import React, { PureComponent } from 'react'


const weatherBlock = ({ celcius, weather_status }) => (
  <div className="weatherBlock">
    <div className="weatherBlock__celsius">
      <h2 className="H2 H2--white">{celcius}</h2>
    </div>
    <div className="weatherBlock__weather-type">
      <h3 className="H3 H3--white">Today is going to be</h3>
      <h1 className="boldH1 boldH1--white">{weather_status}</h1>
    </div>
  </div>
);

export default weatherBlock;