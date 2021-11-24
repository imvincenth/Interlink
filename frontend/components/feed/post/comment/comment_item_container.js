import React from 'react';
import { connect } from 'react-redux';
import { fetchComments, updateComment, deleteComment } from '../../../../actions/comment_actions';
import Comment from './comment_item';

const mSTP = state => ({
  currentUser: state.entities.users[state.session.currentUser]
});

const mDTP = dispatch => ({
  fetchComments: () => dispatch(fetchComments()),
  updateComment: comment => dispatch(updateComment(comment)),
  deleteComment: comment => dispatch(deleteComment(comment))
});

export default connect(mSTP, mDTP)(Comment);