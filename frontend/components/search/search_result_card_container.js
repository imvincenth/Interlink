import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';
import { createConnection,fetchConnections, fetchConnection, updateConnection, deleteConnection } from '../../actions/connection_actions';
import SearchResultCard from './search_result_card';

const mSTP = state => ({
  currentUser: state.entities.users[state.session.id],
  connections: Object.values(state.entities.connections)
});

const mDTP = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchConnections: userId => dispatch(fetchConnections(userId)),
  fetchConnection: (connecteeId, connectorId) => dispatch(fetchConnection(connecteeId, connectorId)),
  createConnection: connection => dispatch(createConnection(connection)),
  updateConnection: connection => dispatch(updateConnection(connection)),
  deleteConnection: connectionId => dispatch(deleteConnection(connectionId)),
});

export default connect(mSTP, mDTP)(SearchResultCard);