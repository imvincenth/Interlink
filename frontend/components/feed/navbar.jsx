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
          <div className="navbar-item">
            <Link to="/feed">
              <img src={window.feedURL} alt="feed url" />
              <span>Home</span>
            </Link>
          </div>

          <div className="navbar-item">
            <Link to="/">
              <img src={window.networkURL} alt="feed url" />
              <span>Network</span>
            </Link>
          </div>

          <div className="navbar-item">
            <a href="https://github.com/imvincenth">
              <img src={window.githubURL} alt="feed url" />
              <span>Github</span>
            </a>
          </div>

          <div className="navbar-item">
            <a href="https://www.linkedin.com/in/vincent-hsu-45a6a1220/">
              <img src={window.linkedinURL} alt="feed url" />
              <span>Real Linkedin</span>
            </a>
          </div>

          <div className="navbar-profile">
            <Link to="/">
              <span>Me</span>
            </Link>
          </div>
        </div>

        </div>
      </div>
    )
  };
};

export default Navbar;