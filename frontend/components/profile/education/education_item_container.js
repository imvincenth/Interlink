import React from 'react';
import { connect }  from 'react-redux';
import { fetchUser } from '../../../actions/user_actions';
import { fetchEducations, deleteEducation } from '../../../actions/education_actions';
import { openModal } from '../../../actions/modal_actions';
import Education from './education_item.jsx';

const mSTP = (state, ownProps) => {
  return {
    currentUser: state.entities.users[state.session.id],
  }
};

const mDTP = dispatch => ({
  fetchUser: userId => dispatch(fetchUser(userId)),
  fetchEducations: () => dispatch(fetchEducations()),
  openEditEducationModal: education => dispatch(openModal("editEducation", education)),
  deleteEducation: education => dispatch(deleteEducation(education))
});

export default connect(mSTP, mDTP)(Education);