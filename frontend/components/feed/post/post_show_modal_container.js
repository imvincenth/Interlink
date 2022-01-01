import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../../actions/modal_actions';
import PostShowModal from './post_show_modal';

const mSTP = state => ({
  post: state.ui.modalParamsReducer,
  currentUser: state.entities.users[state.session.id],
  errors: state.errors.posts,
  users: state.entities.users
});

const mDTP = dispatch => ({
  action: post => dispatch(updatePost(post)),
  closeModal: () => dispatch(closeModal()),
});

export default connect(mSTP, mDTP)(PostShowModal);