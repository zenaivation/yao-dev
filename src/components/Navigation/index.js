import React, { PureComponent, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeIcon from '../../images/MenuIcons/home-big.png';
import HomeIconActive from '../../images/MenuIcons/home-active-big.png';
import MapIcon from '../../images/MenuIcons/map-big.png';
import MapIconActive from '../../images/MenuIcons/map-active-big.png';
import BookmarkIcon from '../../images/MenuIcons/bookmark-big.png';
import BookmarkIconActive from '../../images/MenuIcons/bookmark-active-big.png';
import SettingsIcon from '../../images/MenuIcons/settings-big.png';
import SettingsIconActive from '../../images/MenuIcons/settings-active-big.png';

import './styles.scss';


const Navigation = ({ home, explore, bookmark, profile }) => (
  <Fragment>
    <div className="footer-bar">
      {home ? (<Link to={'/'} ><img src={HomeIconActive} alt="home" /></Link>)
        : (<Link to={'/'} ><img src={HomeIcon} alt="home" /></Link>)
      }

      {explore ?
        (<Link to={'/map'} ><img src={MapIconActive} alt="map" /></Link>)
        :
        (<Link to={'/map'} ><img src={MapIcon} alt="map" /></Link>)
      }

      {bookmark ?
        (<Link to={'/bookmarks'} ><img src={BookmarkIconActive} alt="bookmark" /></Link>)
        :
        (<Link to={'/bookmarks'} ><img src={BookmarkIcon} alt="bookmark" /></Link>)
      }

      {profile ?
        (<Link to={'/profile'} ><img src={SettingsIconActive} alt="profile" /></Link>)
        :
        (<Link to={'/profile'} ><img src={SettingsIcon} alt="profile" /></Link>)
      }
    </div>
    <ToastContainer autoClose={3000} />
  </Fragment>
);

export default Navigation;
