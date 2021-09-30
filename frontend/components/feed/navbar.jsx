import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
    return (
      <div id="navbar-container">
        <div className="navbar-content">

        <div className="navbar-logo-box"> 
          <Link to="/">
            <img src={logoURL} className="navbar-logo" alt="login logo" />
          </Link>
        </div>

        <div className="navbar-search-box">
          <p></p>
        </div>

        <div className="navbar-list">

          <div className="navbar-home-box">
            <Link to="/feed">feed</Link>
          </div>

          <div className="navbar-network-box">
            <span>network</span>
          </div>

          <div className="navbar-github-box">
            <span>github</span>
          </div>

          <div className="navbar-linkedin-box">
            <span>linkedin</span>
          </div>

          <div className="navbar-profile">
            <span>me</span>
          </div>

        </div>

        </div>
      </div>
    )
  };
};

export default Navbar;