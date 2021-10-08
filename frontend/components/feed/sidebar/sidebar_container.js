import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../actions/session_actions';
import Sidebar from './sidebar';

const mSTP = ({ session, entities: { users } }) => ({
    currentUser: users[session.id]
});

const mDTP = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
  logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(Sidebar);