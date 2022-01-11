import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchUser } from '../../../actions/user_actions';
import { fetchConnections, updateConnection, deleteConnection } from '../../../actions/connection_actions';
import InvitationManagerCard from './invitation_manager_card';

const mSTP = state => ({
  users: state.entities.users,
  currentUser: state.entities.users[state.session.id],
  connections: Object.values(state.entities.connections)
});

const mDTP = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchUser: userId => dispatch(fetchUser(userId)),
  fetchConnections: userId => dispatch(fetchConnections(userId)),
  updateConnection: connection => dispatch(updateConnection(connection)),
  deleteConnection: connectionId => dispatch(deleteConnection(connectionId))
});

export default connect(mSTP, mDTP)(InvitationManagerCard);