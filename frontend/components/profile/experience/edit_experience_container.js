import React from 'react';
import { connect } from 'react-redux';
import { createExperience } from '../../../actions/experience_actions';
import CreateExperienceForm from './create_experience';

const mSTP = state => ({
  experience: state.entities.experiences[state.entities.users[state.session.currentUser].id],
  formType: "Add experience"
});

const mDTP = dispatch => ({
  action: experience => dispatch(editExperience(experience)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mSTP, mDTP)(CreateExperienceForm);