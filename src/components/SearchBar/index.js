import React, { PureComponent } from 'react'
import './styles.scss';


const SearchBar = ({ onChange, onKeyDown }) => (
  <div className="search-bar">
    <img src="https://i.imgur.com/J8nZmJI.png" alt="search" />
    <input onChange={onChange} onKeyDown={onKeyDown} className="H5 H5--white" placeholder="Look around near me for…" type="text" />
  </div>
);

export default SearchBar;