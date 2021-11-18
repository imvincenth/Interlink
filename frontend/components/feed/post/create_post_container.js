import React from 'react';
import { connect } from 'react-redux';
import Post from './create_post';

const mSTP = ({ session, entities: { users } }) => ({
    currentUser: users[session.id]
});

const mDTP = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId))
});

export default connect(mSTP, mDTP)(Post);