import React from 'react';
import { connect } from 'react-redux';
import { updateExperience } from '../../../actions/experience_actions';
import { closeModal } from '../../../actions/modal_actions';
import { removeErrors } from '../../../actions/experience_actions';
import EditExperienceForm from './edit_experience';

const mSTP = state => ({
  experience: state.entities.experiences[state.entities.users[state.session.id].id],
  currentUser: state.entities.users[state.session.id],
  errors: state.errors.experiences,
  formType: "Edit experience"
});

const mDTP = dispatch => ({
  action: experience => dispatch(updateExperience(experience)),
  closeModal: () => dispatch(closeModal()),
  removeErrors: () => dispatch(removeErrors())
});

export default connect(mSTP, mDTP)(EditExperienceForm);