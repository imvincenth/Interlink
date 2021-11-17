import React from 'react';
import { connect }  from 'react-redux';
import { fetchExperiences } from '../../../actions/experience_actions';
import { openModal } from '../../../actions/modal_actions';
import Experience from './experience_item.jsx';

const mSTP = (state, ownProps) => {
  return {currentUser: state.entities.users[state.session.currentUser]}
};

const mDTP = dispatch => ({
  fetchExperiences: () => dispatch(fetchExperiences()),
  openEditExperienceModal: (experience) => dispatch(openModal("editExperience", experience)),
});

export default connect(mSTP, mDTP)(Experience);