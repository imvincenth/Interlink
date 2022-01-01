import React from 'react';
import { connect } from 'react-redux';
import PostShowModal from './post_show_modal';

const mSTP = state => ({
  post: state.ui.modalParamsReducer,
  currentUser: state.entities.users[state.session.id],
  errors: state.errors.posts,
});

const mDTP = dispatch => ({
  action: post => dispatch(updatePost(post)),
  closeModal: () => dispatch(closeModal()),
  deletePost: postId => dispatch(deletePost(postId)),
  removeErrors: () => dispatch(removeErrors())
});

export default connect(mSTP, mDTP)(PostShowModal);