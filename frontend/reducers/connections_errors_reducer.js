import { 
  RECEIVE_CONNECTION_ERRORS,
  REMOVE_CONNECTION,
  REMOVE_ERRORS
} from "../actions/connection_actions"

const connectionErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_CONNECTION_ERRORS:
      return action.errors;

    case REMOVE_CONNECTION:
      return [];

    case REMOVE_ERRORS:
      return [];

    default:
      return oldState;
  }
}

export default connectionErrorsReducer;