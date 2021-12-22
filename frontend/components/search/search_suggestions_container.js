import React from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/user_actions';
import Suggestions from './search_suggestions';

const mSTP = state => ({
  currentUser: state.entities.users[state.session.id],
  users: state.entities.users
});

const mDTP = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers())
});

export default connect(mSTP, mDTP)(Suggestions);