import { 
  RECEIVE_USER_ERRORS,
  REMOVE_USER,
  REMOVE_ERRORS
} from "../actions/user_actions"

const userErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_USER_ERRORS:
      return action.errors;

    case REMOVE_USER:
      return [];

    case REMOVE_ERRORS:
      return [];

    default:
      return [];
  }
}

export default userErrorsReducer;