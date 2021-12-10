import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';
import { fetchConnections } from '../../actions/connection_actions';
import Network from './network';

const mSTP = state => ({
  users: Object.values(state.entities.users)
});

const mDTP = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
});

export default connect(mSTP, mDTP)(Network);