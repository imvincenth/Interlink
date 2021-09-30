import React from 'react';
import { connect } from 'react-redux';
import Navbar from './navbar';

const mSTP = (state, ownProps) => ({
  user: state.entities.users[state.session.currentUserId],
});

const mDTP = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
  logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(Navbar);