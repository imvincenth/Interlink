import React from 'react';
import { connect } from 'react-redux';
import { fetchExperiences } from '../../actions/experience_actions'
import { fetchEducations } from '../../actions/education_actions';
import { openModal } from '../../actions/modal_actions';
import Profile from './profile';

const mSTP = (state, ownProps) => ({
  educations: state.entities.educations,
  experiences: Object.values(state.entities.experiences),
  currentUser: state.entities.users[state.session.id]
});

const mDTP = dispatch => ({
  fetchExperiences: () => dispatch(fetchExperiences()),
  fetchEducations: () => dispatch(fetchEducations()),
  openCreateExperienceModal: (
    <button className="open-modal" onClick={() => dispatch(openModal('createExperience'))}>
      Add Experience
    </button>
  ),
});

export default connect(mSTP, mDTP)(Profile);