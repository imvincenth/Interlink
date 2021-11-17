import { 
  RECEIVE_EXPERIENCE_ERRORS,
  REMOVE_EXPERIENCE,
  REMOVE_ERRORS
} from "../actions/experience_actions"

const experienceErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_EXPERIENCE_ERRORS:
      return action.errors;

    case REMOVE_EXPERIENCE:
      return [];

    case REMOVE_ERRORS:
      return [];

    default:
      return oldState;
  }
}

export default experienceErrorsReducer;