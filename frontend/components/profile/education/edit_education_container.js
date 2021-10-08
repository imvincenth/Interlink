import React from 'react';
import { connect } from 'react-redux';
import { updateEducation, deleteEducation } from '../../../actions/education_actions';
import { closeModal } from '../../../actions/modal_actions';
import { removeErrors } from '../../../actions/education_actions';
import EditEducationForm from './edit_education';

const mSTP = (state, ownProps) => {
  return {education: state.ui.modalParamsReducer,
  currentUser: state.entities.users[state.session.id],
  errors: state.errors.educations,
  formType: "Edit Education"}
};

const mDTP = dispatch => ({
  action: education => dispatch(updateEducation(education)),
  closeModal: () => dispatch(closeModal()),
  deleteEducation: educationId => dispatch(deleteEducation(educationId)),
  removeErrors: () => dispatch(removeErrors())
});

export default connect(mSTP, mDTP)(EditEducationForm);