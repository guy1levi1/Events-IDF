import React from "react";
import { NavLink } from "react-router-dom";
import "./SideBar.css";

const SideBar = ({ isOpen, onClose }) => {
  const sidebarClass = isOpen ? "sidebar open" : "sidebar";

  return (
    <div className={sidebarClass}>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Login Page
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Table"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            Table Page
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
