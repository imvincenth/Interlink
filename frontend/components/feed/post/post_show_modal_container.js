import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../../actions/modal_actions';
import { fetchPostReactions } from '../../../actions/reaction_actions';
import PostShowModal from './post_show_modal';

const mSTP = state => ({
  post: state.ui.modalParamsReducer,
  currentUser: state.entities.users[state.session.id],
  errors: state.errors.posts,
  users: state.entities.users,
  usersArr: Object.values(state.entities.users),
  reactions: Object.values(state.entities.reactions)
});

const mDTP = dispatch => ({
  action: post => dispatch(updatePost(post)),
  closeModal: () => dispatch(closeModal()),
  fetchPostReactions: postId => dispatch(fetchPostReactions(postId))
});

export default connect(mSTP, mDTP)(PostShowModal);