import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions';
import EditProfileForm from './edit_profile';

const mSTP = state => ({
  experience: state.entities.experiences[state.entities.users[state.session.id].id],
  currentUser: state.entities.users[state.session.id]
});

const mDTP = dispatch => ({
  action: user => dispatch(update(user)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(EditProfileForm);