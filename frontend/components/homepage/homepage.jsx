import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../../app/assets/images/namelogo.svg";
import Hero from "../../../app/assets/images/homepage.svg";

class Homepage extends React.Component {
  render() {
    return (
      <div className="homepage">
        <nav className="homepage-nav">
          <a href="/">
            <img src={Logo} className="login-logo" alt="login logo" />
          </a>

          <div>
            <Link className="joinnow-nav" to="/signup">Join Now</Link>
            <Link className="signup-nav" to="/login">Sign In</Link>
          </div>
        </nav>

        <section class="homepage-main">
          <p>One more step and it'll be the farthest I've ever been from home</p>
          <img src={Hero} className="homepage-picture" alt="hero picture" />
        </section>
      </div>
    )
  }
}

export default Homepage;