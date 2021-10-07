import { connect }  from 'react-redux';
import { fetchExperiences } from '../../../actions/experience_actions';
import { Experience } from './experience_item.jsx';

const mSTP = (state, ownProps) => ({
  experience: state.entities.experiences[state.entities.users[state.session.id].id],
  currentUser: state.entities.users[state.session.currentUser],
});

const mDTP = dispatch => ({
  fetchExperiences: () => dispatch(fetchExperiences()),
  openEditExperienceModal: (
    <button className="open-modal" onClick={() => dispatch(openModal('editExperience'))}>
      Edit Experience
    </button>
  ),
});

export default connect(mSTP, mDTP)(Experience);