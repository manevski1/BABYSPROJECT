import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import './styles.css';

import BabysLogo from '../../images/logo_color.svg';
import BabysLogoWhite from '../../images/logo_white.svg';
import * as actionType from '../../constants/actionTypes';
/* import useStyles from './styles'; */

const Botbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  /* const classes = useStyles(); */

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
<div id="POSITION">
        <div id="BOTTOM">
          <div id="LOGO">
            <Link to="/" id="LINKS">
              <img component={Link} to="/" src={BabysLogoWhite} alt="icon" height="40px" />
            </Link>
          </div>
          <div id="NAVIGATION">
            <ul id="ulnav1">
              <li>
                <Link id="LINKS" to="/breakfast">BREAKFAST</Link>
              </li>
              <li>
                •
              </li>
              <li>
                <Link id="LINKS" to="/brunch">BRUNCH</Link>
              </li>
              <li>
                •
              </li>
              <li>
                <Link id="LINKS" to="/lunch">LUNCH</Link>
              </li>
              <li>
                •
              </li>
              <li>
                <Link id="LINKS" to="/dinner">DINNER</Link>
              </li>
            </ul>
          </div>
          <div id="LTD">
            Baby’s Food Place copyright © 2021
          </div>
        </div>
      </div>
  );
};

export default Botbar;