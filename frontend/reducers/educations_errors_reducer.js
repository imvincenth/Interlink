import { 
  RECEIVE_EDUCATION_ERRORS,
  REMOVE_EDUCATION_ERRORS,
  REMOVE_ERRORS
} from "../actions/education_actions"

const EducationErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_EDUCATION_ERRORS:
      return action.errors

    case REMOVE_EDUCATION_ERRORS:
      return []

    case REMOVE_ERRORS:
      return []

    default:
      return oldState
  }
}

export default EducationErrorsReducer;