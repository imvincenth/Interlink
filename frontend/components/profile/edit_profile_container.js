import React from 'react';
import { connect } from 'react-redux';
import { update, updatePicture } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';
import EditProfileForm from './edit_profile';

const mSTP = state => ({
  currentUser: state.entities.users[state.session.id]
});

const mDTP = dispatch => ({
  action: user => dispatch(update(user)),
  updatePicture: (formData, userId) => dispatch(updatePicture(formData, userId)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(EditProfileForm);