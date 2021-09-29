import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Logo from "../../../app/assets/images/namelogo.svg";

class Feed extends React.Component {
  render() {
    const { currentUser, logout } = this.props;
    return (
      <div className="header-group">
        <img src={Logo} className="login-logo" alt="login logo" />
        <h2 className="header-name">Hi, {currentUser.first_name} {currentUser.last_name}!</h2>
        <button className="header-button" onClick={logout}>Log Out</button>
    </div>
    )
  }
}

export default Feed;