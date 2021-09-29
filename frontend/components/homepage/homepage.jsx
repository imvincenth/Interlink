import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../../app/assets/images/namelogo.svg";
import Ring from "../../../app/assets/images/theonering.svg";
import Fire from "../../../app/assets/images/homepage-fire.svg";

class Homepage extends React.Component {
  refreshPage() {
    window.location.reload();
  }

  render() {
    return (
      <div className="homepage">
        <nav className="homepage-nav">
          <a href="/">
            <img src={window.namelogoURL} className="login-logo" alt="login logo" />
          </a>

          <div>
            <Link className="joinnow-nav" to="/signup" >Join Now</Link>
            <Link className="signup-nav" to="/login" >Sign In</Link>
          </div>
        </nav>

        <section className="homepage-main">
          <h3 className="homepage-text">One Ring to rule them all,<br/>
            One Ring to find them,<br/>
            One Ring to bring them all<br/>
            and in the darkness bind them.</h3>
          <img src={window.ringURL} className="homepage-picture" alt="hero picture" />
          <img src={window.fireURL} className="fire-picture" alt="fire picture" />
        </section>
      </div>
    )
  }
}

export default Homepage;