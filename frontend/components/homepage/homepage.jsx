import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Homepage extends React.Component {
  refreshPage() {
    window.location.reload();
  }

  render() {
    if (this.props.currentUser) {
      return <Redirect to="/feed" />;
    } else if (this.props.errors.length !== 0) {
      this.refreshPage();
    }
    return (
      <div className="homepage">
        <nav className="homepage-nav">
          <a href="/">
            <img src={window.namelogoURL} className="login-logo" alt="login logo" />
          </a>

          <div className="homepage-nav-right">
            <Link className="joinnow-nav" to="/signup" >Join now</Link>
            <Link className="signin-nav" to="/login" >Sign in</Link>
          </div>
        </nav>

        <section className="homepage-main">

          <div className="homepage-main-left">
            <h3 className="homepage-text">Welcome to your professional community</h3>
            <span className="homepage-subtext">...in Middle-Earth</span>

            <br />
            <br />
            <br />

            <div className="homepage-links">
              <ul className="homepage-list">
                <li className="homepage-list-item">
                  <a className="homepage-card" href="https://www.linkedin.com/in/vincent-hsu-45a6a1220/">The real LinkedIn <img className="homepage-list-icon" src={window.linkedinURL} alt="linkedin logo" /></a>
                </li>
                <li className="homepage-list-item">
                  <a className="homepage-card" href="https://angel.co/vincent-hsu-7">Find me on AngelList <img className="homepage-list-icon" src={window.angellistURL} alt="angellist logo" /></a>
                </li>
                <li className="homepage-list-item">
                  <a className="homepage-card" href="https://github.com/imvincenth">Look at my other projects <img className="homepage-list-icon" src={window.githubURL} alt="github logo" /></a>
                </li>
              </ul>
            </div>
          </div>

          <div className="homepage-main-right">
            <img src={window.ringURL} className="homepage-picture" alt="hero picture" />
          </div>

          <img src={window.fireURL} className="fire-picture" alt="fire picture" />
        </section>
      </div>
    )
  }
}

export default Homepage;