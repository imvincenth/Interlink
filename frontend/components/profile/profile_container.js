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
  errors: state.errors.users,
  educations: Object.values(state.entities.educations),
  experiences: Object.values(state.entities.experiences),
  connections: Object.values(state.entities.connections)
});

const mDTP = dispatch => ({
  fetchExperiences: userId => dispatch(fetchExperiences(userId)),
  fetchEducations: userId => dispatch(fetchEducations(userId)),
  fetchConnections: userId => dispatch(fetchConnections(userId)),
  fetchUsers: () => dispatch(fetchUsers()),
  fetchUser: user => dispatch(fetchUser(user)),
  openModal: (modalType, user) => dispatch(openModal(modalType, user)),
  createConnection: connection => dispatch(createConnection(connection)),
  updateConnection: connection => dispatch(updateConnection(connection)),
  deleteConnection: connectionId => dispatch(deleteConnection(connectionId)),
});

export default connect(mSTP, mDTP)(Profile);