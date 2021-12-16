import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchUser } from '../../actions/user_actions';
import { fetchConnections } from '../../actions/connection_actions';
import Network from './network';

const mSTP = state => ({
  users: Object.values(state.entities.users),
  currentUser: state.entities.users[state.session.id]
});

const mDTP = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchUser: userId => dispatch(fetchUser(userId))
});

export default connect(mSTP, mDTP)(Network);