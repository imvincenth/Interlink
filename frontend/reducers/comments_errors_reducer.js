import { 
  RECEIVE_COMMENT_ERRORS,
  REMOVE_COMMENT,
  REMOVE_ERRORS
} from "../actions/comment_actions"

const commentErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_COMMENT_ERRORS:
      return action.errors;

    case REMOVE_COMMENT:
      return [];

    case REMOVE_ERRORS:
      return [];

    default:
      return oldState;
  }
}

export default commentErrorsReducer;