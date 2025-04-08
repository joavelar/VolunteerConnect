import React from 'react';
import './header.css';
import HamburgerIcon from '../../assets/hamburgerIcon';

function Header({ toggleSidebar }) {
  return (
    <div className="headerContainer">
      <img className="logoImg" src="/volunteer-connect-logo.png" alt="Logo" />
      <div className="menuIcon" onClick={toggleSidebar}>
        <HamburgerIcon />
      </div>
    </div>
  );
}

export default Header;