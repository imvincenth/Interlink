import React from 'react';
import { connect } from 'react-redux';
import { createExperience } from '../../../actions/experience_actions';
import { closeModal } from '../../../actions/modal_actions';
import { removeErrors } from '../../../actions/experience_actions';
import CreateExperienceForm from './create_experience';

const mSTP = state => ({
  experience: state.entities.experiences[state.entities.users[state.session.id].id],
  currentUser: state.entities.users[state.session.id],
  errors: state.errors.experiences,
  formType: "Add experience"
});

const mDTP = dispatch => ({
  action: experience => dispatch(createExperience(experience)),
  closeModal: () => dispatch(closeModal()),
  removeErrors: () => dispatch(removeErrors())
});

export default connect(mSTP, mDTP)(CreateExperienceForm);