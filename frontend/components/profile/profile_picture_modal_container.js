import React from 'react';
import { connect } from 'react-redux';
import { update } from '../../actions/session_actions';
import { closeModal, clsoeModal } from '../../actions/modal_actions';
import ProfilePictureModal from './profile_picture_modal';

const mSTP = (state, ownProps) => ({
  user: state.ui.modalParamsReducer,
  users: Object.values(state.entities.users),
  currentUser: state.entities.users[state.session.id],
  errors: state.errors.users,
});

const mDTP = dispatch => ({
  action: user => dispatch(update(user)),
  clsoeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(ProfilePictureModal);