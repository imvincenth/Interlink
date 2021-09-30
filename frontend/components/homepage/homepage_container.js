import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Homepage from './homepage';

const mapStateToProps = ({ session, entities: { users }, errors }) => {
  return {
    currentUser: users[session.id],
    errors: errors.session
  };
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Homepage);
