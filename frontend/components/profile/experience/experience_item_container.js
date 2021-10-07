import { connect }  from 'react-redux';
import { fetchExperiences } from '../../../actions/experience_actions';
import { Experience } from './experience_item.jsx';

const mSTP = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.currentUser],
  
});

const mDTP = dispatch => ({
  fetchExperiences: () => dispatch(fetchExperiences()),
});

export default connect(mSTP, mDTP)(Experience);