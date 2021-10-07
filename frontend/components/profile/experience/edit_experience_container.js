import React from 'react';
import { connect } from 'react-redux';
import { updateExperience, deleteExperience } from '../../../actions/experience_actions';
import { closeModal } from '../../../actions/modal_actions';
import { removeErrors } from '../../../actions/experience_actions';
import EditExperienceForm from './edit_experience';

const mSTP = (state, ownProps) => {
  return {experience: state.ui.modalParamsReducer,
  currentUser: state.entities.users[state.session.id],
  errors: state.errors.experiences,
  formType: "Edit experience"}
};

const mDTP = dispatch => ({
  action: experience => dispatch(updateExperience(experience)),
  closeModal: () => dispatch(closeModal()),
  deleteExperience: experienceId => dispatch(deleteExperience(experienceId)),
  removeErrors: () => dispatch(removeErrors())
});

export default connect(mSTP, mDTP)(EditExperienceForm);