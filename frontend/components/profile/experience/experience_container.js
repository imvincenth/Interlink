import { connect }  from 'react-redux';
import { fetchExperiences } from '../../../actions/experience_actions';
import { Experience } from './experience';

const mSTP = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.currentUser],
  experiences: Object.values(state.entities.experiences).filter(
    experience => {
      return experience.user_id === ownProps.match.params.userId
    }
  )
});

const mDTP = dispatch => ({
  fetchExperiences: () => dispatch(fetchExperiences()),
});

export default connect(mSTP, mDTP)(Experience);