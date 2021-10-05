import { connect } from 'react-redux';
import { fetchExperiences } from '../../actions/experience_actions'
import { fetchEducations } from '../../actions/education_actions';
import Profile from './profile';

const mSTP = (state, ownProps) => ({
  educations: state.entities.educations,
  experiences: state.entities.experiences,
  currentUser: state.entities.users[state.session.id]
});

const mDTP = dispatch => ({
  fetchExperiences: () => dispatch(fetchExperiences()),
  fetchEducations: () => dispatch(fetchEducations())
});

export default connect(mSTP, mDTP)(Profile);