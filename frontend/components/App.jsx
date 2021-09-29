import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';

import LogInFormContainer from './session_form/session_form_container';
import SignUpFormContainer from './session_form/signup_form_container';
import HomepageContainer from './homepage/homepage_container';
import PageNotFound from './session_form/404';

import { AuthRoute, ProtectedRoute } from '../util/route_util';

const App = () => (
  <div>
    <Switch>
      <AuthRoute exact path="/login" component={LogInFormContainer} />
      <AuthRoute exact path="/signup" component={SignUpFormContainer} />
      <Route exact path="/" component={HomepageContainer} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
);

export default App;