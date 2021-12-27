import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../../actions/user_actions';
import { logout } from '../../../actions/session_actions';
import Sidebar from './sidebar';

const mSTP = ({ session, entities: { users } }) => ({
  currentUser: users[session.id],
});

const mDTP = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(Sidebar);