import { 
  RECEIVE_POST_ERRORS,
  REMOVE_POST,
  REMOVE_ERRORS
} from "../actions/post_actions"

const postErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_POST_ERRORS:
      return action.errors;

    case REMOVE_POST:
      return [];

    case REMOVE_ERRORS:
      return [];

    default:
      return oldState;
  }
}

export default postErrorsReducer;