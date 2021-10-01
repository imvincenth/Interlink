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

          <div>
            <Link className="joinnow-nav" to="/signup" >Join now</Link>
            <Link className="signin-nav" to="/login" >Sign in</Link>
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