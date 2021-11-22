import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { RECEIVE_USERS, REMOVE_USER } from '../actions/user_actions';

const usersReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state)

  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, { [action.currentUser.id]: action.currentUser });
    case RECEIVE_USERS:
      return action.users;
    case REMOVE_USER:
      delete newState[action.experienceId];
      return newState;
    default:
      return state;
  }
};

export default usersReducer;