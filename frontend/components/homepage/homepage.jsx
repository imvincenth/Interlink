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
          <div className="homepage-main-right">
            <h3 className="homepage-text">“All’s well that ends better.”
            </h3>
            <div className="homepage-links">
              <ul className="homepage-list">
                <li className="homepage-list-item">

                </li>
                <li className="homepage-list-item">

                </li>
                <li className="homepage-list-item">

                </li>
              </ul>
            </div>
          </div>

          <div className="homepage-main-left">
            <img src={window.ringURL} className="homepage-picture" alt="hero picture" />
          </div>

          <img src={window.fireURL} className="fire-picture" alt="fire picture" />
        </section>
      </div>
    )
  }
}

export default Homepage;