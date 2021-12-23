import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../../actions/user_actions';
import Navbar from './navbar';

const mSTP = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  users: state.entities.users
});

const mDTP = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(Navbar);