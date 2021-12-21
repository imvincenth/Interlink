import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';
import Search from './search_result';

const mSTP = state => ({
  currentUser: state.entities.users[state.session.id]
});

const mDTP = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
});

export default connect(mSTP, mDTP)(Search);