import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../../app/assets/images/namelogo.svg";

const Homepage = ({ currentUser, logout }) => {
  const sessionLinks = () => (
    <Link to="/">
      <img src={Logo} alt="login logo" />
    </Link>
  );

  const personalGreeting = () => (
    <hgroup className="header-group">
      <h2 className="header-name">Hi, {currentUser.first_name}!</h2>
      <button className="header-button" onClick={logout}>Log Out</button>
    </hgroup>
  );

  return currentUser ? personalGreeting() : sessionLinks();
};

export default Homepage;