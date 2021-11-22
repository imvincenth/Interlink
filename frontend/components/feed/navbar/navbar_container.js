import React from 'react';
import { connect } from 'react-redux';
import Navbar from './navbar';

const mSTP = (state, ownProps) => ({
  currentUserId: state.session.id
});

const mDTP = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
  logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(Navbar);