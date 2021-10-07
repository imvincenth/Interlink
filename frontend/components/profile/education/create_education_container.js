import React from 'react';
import { connect } from 'react-redux';
import { createEducation } from '../../../actions/education_actions';
import { closeModal } from '../../../actions/modal_actions';
import { removeErrors } from '../../../actions/education_actions';
import CreateEducationForm from './create_education';

const mSTP = state => ({
  education: state.entities.educations[state.entities.users[state.session.id].id],
  currentUser: state.entities.users[state.session.id],
  errors: state.errors.educations,
  formType: "Add Education"
});

const mDTP = dispatch => ({
  action: education => dispatch(createEducation(education)),
  closeModal: () => dispatch(closeModal()),
  removeErrors: () => dispatch(removeErrors())
});

export default connect(mSTP, mDTP)(CreateEducationForm);