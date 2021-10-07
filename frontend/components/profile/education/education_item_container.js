import React from 'react';
import { connect }  from 'react-redux';
import { fetchEducation } from '../../../actions/education_actions';
import { openModal } from '../../../actions/modal_actions';
import Education from './education_item.jsx';

const mSTP = (state, ownProps) => {
  return {currentUser: state.entities.users[state.session.currentUser],}
};

const mDTP = dispatch => ({
  fetchEducation: () => dispatch(fetchEducation()),
  openEditEducationModal: (education) => dispatch(openModal("editEducation", education)),
});

export default connect(mSTP, mDTP)(Education);