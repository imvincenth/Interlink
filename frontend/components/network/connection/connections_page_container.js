import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchUser } from '../../../actions/user_actions';
import { fetchConnections } from '../../../actions/connection_actions';
import ConnectionsPage from './connections_page';

const mSTP = state => ({
  users: Object.values(state.entities.users),
  currentUser: state.entities.users[state.session.id],
  connections: Object.values(state.entities.connections)
});

const mDTP = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchUser: userId => dispatch(fetchUser(userId)),
  fetchConnections: userId => dispatch(fetchConnections(userId))
});

export default connect(mSTP, mDTP)(ConnectionsPage);