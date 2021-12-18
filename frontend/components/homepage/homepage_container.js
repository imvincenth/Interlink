import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Homepage from './homepage';

const mSTP = ({ session, entities: { users }, errors }) => {
  return {
    currentUser: users[session.id],
    errors: errors.session
  };
};

const mDTP = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(mSTP, mDTP)(Homepage);
