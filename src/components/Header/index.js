import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom';

import Logo from '../../images/logo.png';
import Profile from '../../images/profile.png';



const Header = ({ title }) => (
  <div className="header">
    <Link to='/'><img src={Logo} /></Link>
    <h2 className="H2 H2--white">{title} </h2>
    <Link to='/profile'><img src={Profile} /></Link>
  </div>
);

export default Header;