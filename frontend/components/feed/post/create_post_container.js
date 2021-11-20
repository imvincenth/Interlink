import React from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../../actions/post_actions';
import Post from './create_post';

const mSTP = ({ session, entities: { users } }) => ({
    currentUser: users[session.id]
});

const mDTP = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
  createPost: post => dispatch(createPost(post))
});

export default connect(mSTP, mDTP)(Post);