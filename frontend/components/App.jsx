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
import FeedContainer from './feed/feed_container';
// import NetworkContainer from './network/network_container';
import PageNotFound from './session_form/404';
// import ProfileContainer from './profile/profile_container';
import Modal from './modal/modal';

import { AuthRoute, LogoutRoute } from '../util/route_util';

const App = () => (
  <div>
    <Modal />
    <Switch>
      {/* <AuthRoute exact path="/users/:userId" component={ProfileContainer} /> */}
      {/* <AuthRoute exact path="/network" component={NetworkContainer} /> */}
      <AuthRoute exact path="/feed" component={FeedContainer} />
      <LogoutRoute exact path="/login" component={LogInFormContainer} />
      <LogoutRoute exact path="/signup" component={SignUpFormContainer} />
      <Route exact path="/" component={HomepageContainer} />
      <Route component={PageNotFound} />
    </Switch>
  </div>
);

export default App;