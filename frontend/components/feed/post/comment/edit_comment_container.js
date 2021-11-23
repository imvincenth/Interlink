import React from 'react';
import { connect } from 'react-redux';
import { updateComment, deleteComment, removeErrors } from '../../../../actions/comment_actions';
import EditCommentForm from './edit_comment';

const mSTP = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.id],
    errors: state.errors.comments,
    formType: "Edit comment"
  }
};

const mDTP = dispatch => ({
  action: comment => dispatch(updateComment(comment)),
  deleteComment: commentId => dispatch(deleteComment(commentId)),
  removeErrors: () => dispatch(removeErrors())
});

export default connect(mSTP, mDTP)(EditCommentForm);