import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../../actions/user_actions';
import { logout } from '../../../actions/session_actions';
import { fetchConnections } from '../../../actions/connection_actions';
import Sidebar from './sidebar';

const mSTP = ({ session, entities: { users, connections } }) => ({
  currentUser: users[session.id],
  connections: Object.values(connections)
});

const mDTP = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  logout: () => dispatch(logout()),
  fetchConnections: userId => dispatch(fetchConnections(userId))
});

export default connect(mSTP, mDTP)(Sidebar);