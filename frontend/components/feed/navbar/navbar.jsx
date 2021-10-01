import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
    return (
      <div id="navbar-container">
        <div className="navbar-content">

        <div className="navbar-logo-box"> 
          <Link to="/">
            <img src={window.logoURL} className="navbar-logo" alt="login logo" />
          </Link>
        </div>

        <div className="navbar-search-box">
          <p></p>
        </div>

        <div className="navbar-list">
          <div className="navbar-item">
            <Link className="navbar-link active" to="/feed">
              <img className="navbar-icon active" src={window.feedURL} alt="feed url" />
              <h5>Home</h5>
            </Link>
          </div>

          <div className="navbar-item">
            <Link className="navbar-link" to="/">
              <img className="navbar-icon" src={window.networkURL} alt="feed url" />
              <h5>Network</h5>
            </Link>
          </div>

          <div className="navbar-item">
            <a className="navbar-link" href="https://github.com/imvincenth">
              <img className="navbar-icon" src={window.githubURL} alt="feed url" />
              <h5>GitHub</h5>
            </a>
          </div>

          <li className="navbar-item">
            <a className="navbar-link" href="https://www.linkedin.com/in/vincent-hsu-45a6a1220/">
              <img className="navbar-icon" src={window.linkedinURL} alt="feed url" />
              <h5>LinkedIn</h5>
            </a>
          </li>

          <div className="navbar-profile">
            <Link className="navbar-link" to="/">
              <h5>Me</h5>
            </Link>
          </div>
        </div>

        </div>
      </div>
    )
  };
};

export default Navbar;