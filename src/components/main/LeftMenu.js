import React, { Fragment } from 'react';
import {NavLink} from 'react-router-dom'
import {link, activelink} from './menuStyle';

const LeftMenu = () => {
  return (
    <Fragment>

      <NavLink
        to="/"
        exact
        style={link}
        activeStyle={activelink}
      >Home</NavLink>
|
      <NavLink
        to="/schedule"
        exact
        style={link}
        activeStyle={activelink}
      >Reserve</NavLink>
|
      <NavLink
        to="/maintenance"
        exact
        style={link}
        activeStyle={activelink}
      >Repairs</NavLink>
|
      <NavLink
        to="/user"
        exact
        style={link}
        activeStyle={activelink}
      >Profile</NavLink>
    </Fragment>
  )
}
export default LeftMenu;