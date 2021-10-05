import { connect } from 'react-redux';


const mSTP = (state, ownProps) => ({
  educations: state.entities.educations,
  experiences: state.entities.experiences,
  currentUser: state.entities.users[state.session.id]
});

const mDTP = dispatch => ({
  fetchUsers: () => dispatch (fetchUsers())
});

export default connect(mSTP, mDTP)(Profile);