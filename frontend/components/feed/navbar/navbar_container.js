import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../../actions/user_actions';
import Navbar from './navbar';

const mSTP = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id]
});

const mDTP = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
  logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(Navbar);