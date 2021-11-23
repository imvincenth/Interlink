import React from 'react';
import { connect } from 'react-redux';
import { fetchExperiences } from '../../actions/experience_actions'
import { fetchEducations } from '../../actions/education_actions';
import { fetchUsers, fetchUser } from '../../actions/user_actions';
import { openModal } from '../../actions/modal_actions';
import Profile from './profile';

const mSTP = (state, ownProps) => ({
  users: Object.values(state.entities.users),
  user: state.entities.users[ownProps.match.params.userId],
  educations: Object.values(state.entities.educations),
  experiences: Object.values(state.entities.experiences),
  errors: state.errors.users,
  currentUser: state.entities.users[state.session.id],
  userId: ownProps.match.params.userId,
});

const mDTP = dispatch => ({
  fetchExperiences: () => dispatch(fetchExperiences()),
  fetchEducations: () => dispatch(fetchEducations()),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchUser: user => dispatch(fetchUser(user)),
  openEditProfileModal: (
    <button className="open-modal" onClick={() => dispatch(openModal('editProfile'))}>
      <img src={window.vectorURL} />
    </button>
  ),
  openCreateExperienceModal: (
    <button className="open-modal" onClick={() => dispatch(openModal('createExperience'))}>
      <img src={window.plusURL} />
    </button>
  ),
  openCreateEducationModal: (
    <button className="open-modal" onClick={() => dispatch(openModal('createEducation'))}>
      <img src={window.plusURL} />
    </button>
  ),
});

export default connect(mSTP, mDTP)(Profile);