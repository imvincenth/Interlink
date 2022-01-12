import React from 'react';
import { connect } from 'react-redux';
import { update, updatePicture } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';
import BannerModal from './banner_modal';

const mSTP = (state, ownProps) => ({
  user: state.ui.modalParamsReducer,
  users: Object.values(state.entities.users),
  currentUser: state.entities.users[state.session.id],
  errors: state.errors.users,
});

const mDTP = dispatch => ({
  action: user => dispatch(update(user)),
  updatePicture: (formData, userId) => dispatch(updatePicture(formData, userId)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(BannerModal);