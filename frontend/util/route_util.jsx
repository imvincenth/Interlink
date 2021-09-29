import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";


// define some custom routes.
// conditionally render either the component or a 'Redirect' based on whether a user is logged in.


const mapStateToProps = state => {
  return { loggedIn: Boolean(state.session.id ) };
};


const LoginAuth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={props => loggedIn? <Component {...props} /> : <Redirect to="/login"/>}/>
);

const LogoutAuth = ({ component: Component, path, loggedIn, exact }) => (
  <Route path={path} exact={exact} render={props => !loggedIn? <Component {...props} /> : <Redirect to="/feed"/>}/>
);

export const AuthRoute = withRouter(
  connect(mapStateToProps, null)(LoginAuth)
);

export const LogoutRoute = withRouter(
  connect(mapStateToProps, null)(LogoutAuth)
);