import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signup, login } from '../../actions/session_actions';
import { createExperience } from '../../actions/experience_actions';
import { createEducation } from '../../actions/education_actions';
import SignupForm from './signup_form';

const mSTP = state => {
  return {
    errors: state.errors.session,
    eduErrors: state.errors.educations,
    expErrors: state.errors.experiences,
    navLink: <Link to="/login">Join Now</Link>,
    currentUser: state.entities.users[state.session.id]
  };
};

const mDTP = dispatch => {
  return {
    processForm: (user) => dispatch(signup(user)),
    demoLogin: () => dispatch(login({ email: "gandalf@the.grey", password: "password" })),
    createEducation: education => dispatch(createEducation(education)),
    createExperience: experience => dispatch(createExperience(experience))
  };
};

export default connect(mSTP, mDTP)(SignupForm);