import React from 'react';
import { connect } from 'react-redux';
import { createComment } from '../../../../actions/comment_actions';
import Comment from './create_comment';

const mSTP = state => ({
  currentUser: state.entities.users[state.session.currentUser]
});

const mDTP = dispatch => ({
  createComment: comment => dispatch(createComment(comment))
});

export default connect(mSTP, mDTP)(Comment);