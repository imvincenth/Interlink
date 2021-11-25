import React from 'react';
import { connect } from 'react-redux';
import { fetchComments, createComment, updateComment, deleteComment } from '../../../../actions/comment_actions';
import Comment from './comment_item';

const mSTP = state => ({
  currentUser: state.entities.users[state.session.id],
  users: Object.values(state.entities.users),
  comments: Object.values(state.entities.comments)
});

const mDTP = dispatch => ({
  fetchComments: () => dispatch(fetchComments()),
  createComment: comment => dispatch(createComment(comment)),
  updateComment: comment => dispatch(updateComment(comment)),
  deleteComment: comment => dispatch(deleteComment(comment))
});

export default connect(mSTP, mDTP)(Comment);