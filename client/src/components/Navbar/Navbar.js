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

const Navbar = () => {
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
    <>
      <div id="TOPBAR">
        <div id="LOGO">
          <Link id="LINKS" to="/">
            <img component={Link} to="/" src={BabysLogo} alt="icon" height="62px" />
          </Link>
        </div>
        <div id="NAVIGATION">
          <ul id="ulnav">
            <li id="linav">
              <Link id="LINKS" to="/breakfast">BREAKFAST</Link>
            </li>
            <li id="DOT">
              •
            </li>
            <li id="linav">
              <Link id="LINKS" to="/brunch">BRUNCH</Link>
            </li>
            <li id="DOT">
              •
            </li>
            <li id="linav">
              <Link id="LINKS" to="/lunch">LUNCH</Link>
            </li>
            <li id="DOT">
              •
            </li>
            <li id="linav">
              <Link id="LINKS" to="/dinner">DINNER</Link>
            </li>
          </ul>
        </div>
        <div id="TOOLBAR">
          {user?.result ? (
              <ul id="ulnav">
                <li id="linav">
                  MY RECIPES
                </li>
                <li id="DOT2">
                  •
                </li>
                <li id="linav">
                  MY PROFILE
                </li>
                <li id="DOT2">
                  •
                </li>
                <li id="logoutnav" onClick={logout}>
                  LOG OUT
                </li>
              </ul>
          ) : (
            <div id="AUTHS">
              <button id="LOGIN">
                <Link id="LINKS" to="/auth">LOG IN</Link>
              </button>
              <span id="OR">or</span>
              <button id="REGISTER">
                <Link id="LINKS" to="/auth">CREATE ACCOUNT</Link>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
