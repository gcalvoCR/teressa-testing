import React from "react";
// Styles and assets
import './Header.css';
// temp data this should come from the backend
import configData from '../data/config'

function Header () {

  const config = configData;

  return (
    <header>
      <nav>
        <div className="logo-brand">
          <div>
            <h1>{config.title}</h1>
            <p>{config.slogan}</p>
          </div>
        </div>
        <ul className="nav-items">
          <li>by <strong>{config.author}</strong></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header;