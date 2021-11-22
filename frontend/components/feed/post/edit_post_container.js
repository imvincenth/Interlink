import React from 'react';
import { connect } from 'react-redux';
import { updatePost, deletePost } from '../../../actions/post_actions';
import { closeModal } from '../../../actions/modal_actions';
import { removeErrors } from '../../../actions/post_actions';
import EditPostForm from './edit_post';

const mSTP = (state, ownProps) => {
  return {post: state.ui.modalParamsReducer,
  currentUser: state.entities.users[state.session.id],
  errors: state.errors.posts,
  formType: "Edit post"}
};

const mDTP = dispatch => ({
  action: post => dispatch(updatePost(post)),
  closeModal: () => dispatch(closeModal()),
  deletePost: postId => dispatch(deletePost(postId)),
  removeErrors: () => dispatch(removeErrors())
});

export default connect(mSTP, mDTP)(EditPostForm);