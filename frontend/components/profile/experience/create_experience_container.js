import React from 'react';
import { connect } from 'react-redux';
import { createExperience } from '../../../actions/experience_actions';
import { closeModal } from '../../../actions/modal_actions';
import CreateExperienceForm from './create_experience';

const mSTP = state => ({
  currentUser: state.entities.users[state.session.id],
  formType: "Add experience"
});

const mDTP = dispatch => ({
  action: experience => dispatch(createExperience(experience)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(CreateExperienceForm);