import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup, login } from '../../actions/session_actions';
import SignupForm from './signup_form';

const mSTP = state => {
  return {
    errors: state.errors.session,
    navLink: <Link to="/login">Join Now</Link>
  };
};

const mDTP = dispatch => {
  return {
    processForm: (user) => dispatch(signup(user)),
    demoLogin: () => dispatch(login({ email: "gandalf@the.grey", password: "password" }))
  };
};

export default connect(mSTP, mDTP)(SignupForm);