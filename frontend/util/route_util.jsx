import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";


// define some custom routes.
// conditionally render either the component or a 'Redirect' based on whether a user is logged in.


const mSTP = state => {
  return { 
    loggedIn: Boolean(state.session.id)
  };
};

const LoginAuth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={props => loggedIn ? <Component {...props} /> : <Redirect to="/login"/>}/>
);

const LogoutAuth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={props => loggedIn ? <Redirect to="/feed"/> : <Component {...props} />}/>
);

export const AuthRoute = withRouter(
  connect(mSTP, null)(LoginAuth)
);

export const LogoutRoute = withRouter(
  connect(mSTP, null)(LogoutAuth)
);