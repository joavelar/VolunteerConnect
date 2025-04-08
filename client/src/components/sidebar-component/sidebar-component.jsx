import React from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '../../assets/closeIcon';  
import LoginIcon from '../../assets/loginIcon';
import './sidebar-component.css';

function Sidebar({ isOpen, toggleSidebar }) {
    return (
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="closeButton" onClick={toggleSidebar}>
          <CloseIcon />
        </button>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/volunteer">Volunteer</Link></li>
          <li><Link to="/organizations">Organizations</Link></li>
        </ul>
        <div className="loginButton">
          <Link to="/login">
            <button>
              <LoginIcon />
            </button>
          </Link>
        </div>
      </div>
    );
}

export default Sidebar;
