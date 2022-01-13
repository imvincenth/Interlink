import React from 'react';
import { connect } from 'react-redux';
import { fetchExperiences } from '../../actions/experience_actions'
import { fetchEducations } from '../../actions/education_actions';
import { fetchUsers, fetchUser } from '../../actions/user_actions';
import { openModal } from '../../actions/modal_actions';
import { createConnection, fetchConnections, updateConnection, deleteConnection } from '../../actions/connection_actions';
import Profile from './profile';

const mSTP = (state, ownProps) => ({
  users: Object.values(state.entities.users),
  user: state.entities.users[ownProps.match.params.userId],
  userId: ownProps.match.params.userId,
  currentUser: state.entities.users[state.session.id],
  educations: Object.values(state.entities.educations),
  experiences: Object.values(state.entities.experiences),
  errors: state.errors.users,
  // connection: Object.values(state.entities.connections)[0],
  connections: Object.values(state.entities.connections)
});

const mDTP = dispatch => ({
  fetchExperiences: userId => dispatch(fetchExperiences(userId)),
  fetchEducations: userId => dispatch(fetchEducations(userId)),
  fetchConnections: userId => dispatch(fetchConnections(userId)),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchUser: user => dispatch(fetchUser(user)),
  openModal: (modalType, user) => dispatch(openModal(modalType, user)),
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
  createConnection: connection => dispatch(createConnection(connection)),
  updateConnection: connection => dispatch(updateConnection(connection)),
  deleteConnection: connectionId => dispatch(deleteConnection(connectionId)),
});

export default connect(mSTP, mDTP)(Profile);