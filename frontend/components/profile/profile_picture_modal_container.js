import React from 'react';
import { connect } from 'react-redux';
import { update, updatePicture, deletePicture } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';
import ProfilePictureModal from './profile_picture_modal';

const mSTP = (state, ownProps) => ({
  users: Object.values(state.entities.users),
  currentUser: state.entities.users[state.session.id],
  errors: state.errors.users,
});

const mDTP = dispatch => ({
  action: user => dispatch(update(user)),
  updatePicture: (formData, userId) => dispatch(updatePicture(formData, userId)),
  deletePicture: imageType => dispatch(deletePicture(imageType)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(ProfilePictureModal);