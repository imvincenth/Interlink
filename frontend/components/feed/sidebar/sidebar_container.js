import React from 'react';
import { connect } from 'react-redux';
import Sidebar from './sidebar';

const mSTP = ({ session, entities: { users } }) => ({
    currentUser: users[session.id]
});

const mDTP = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId))
});

export default connect(mSTP, mDTP)(Sidebar);