import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../actions/session_actions';
import SessionForm from './session_form';

const mSTP = state => {
  return {
    errors: state.errors.session,
    formType: 'Sign in',
    navLink: <Link to='/signup'>Join Now</Link>,
    currentUser: state.entities.users[state.session.id]
  };
};

const mDTP = dispatch => {
  return {
    processForm: (user) => dispatch(login(user)),
    demoLogin: () => dispatch(login({ email: "gandalf@the.grey", password: "password" }))
  };
};

export default connect(mSTP, mDTP)(SessionForm);