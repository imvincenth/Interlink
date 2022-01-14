import React from 'react';
import { connect }  from 'react-redux';
import { fetchUser } from '../../../actions/user_actions';
import { fetchExperiences, deleteExperience } from '../../../actions/experience_actions';
import { openModal } from '../../../actions/modal_actions';
import Experience from './experience_item.jsx';

const mSTP = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.id],
  }
};

const mDTP = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
  fetchExperiences: () => dispatch(fetchExperiences()),
  openModal: (modalType, user) => dispatch(openModal(modalType, user)),
  deleteExperience: experience => dispatch(deleteExperience(experience))
});

export default connect(mSTP, mDTP)(Experience);