import React from 'react';
import "../../styles/Sidebar.css";
import { NavLink } from 'react-router-dom';
import logo from '../../assets/bitlearnslogo.jpg';
// importing icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChalkboardTeacher,
    faUsers,
    faBook,
    faChartPie,
    faBell,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <img src={logo} alt="Bitlearns Logo" />
      </div>

      {/* Navigation Menu */}
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/lectures" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FontAwesomeIcon icon={faChalkboardTeacher} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/classes" className={({ isActive }) => (isActive ? 'active' : '')}>
          <FontAwesomeIcon icon={faUsers} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/courses" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FontAwesomeIcon icon={faBook} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/analytics" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FontAwesomeIcon icon={faChartPie} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/notifications" className={({ isActive }) => (isActive ? 'active' : '')}>
            <FontAwesomeIcon icon={faBell} />
          </NavLink>
        </li>
      </ul>

      {/* Profile Section */}
      <div className="sidebar-profile">
        <img src="/path-to-your-profile-pic.png" alt="Profile" />
      </div>
    </div>
  );
};

export default Sidebar;
