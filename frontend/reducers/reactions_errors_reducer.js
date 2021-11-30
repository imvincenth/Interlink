import {
  RECEIVE_REACTION_ERRORS,
  REMOVE_REACTION,
  REMOVE_ERRORS
} from "../actions/reaction_actions";

const reactionErrorsReducer = (oldState = [], action) => {
  Object.freeze(oldState);

  switch(action.type) {
    case RECEIVE_REACTION_ERRORS:
      return action.errors;

    case REMOVE_REACTION:
      return [];

    case REMOVE_ERRORS:
      return [];

    default:
      return oldState;
  }
}