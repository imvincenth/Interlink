import { RECEIVE_REACTIONS, RECEIVE_REACTION, REMOVE_REACTION } from "../actions/reaction_actions";

const reactionsReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = Object.assign({}, oldState)

  switch (action.type) {
    case RECEIVE_REACTIONS:
      return action.reactions;
    case RECEIVE_REACTION:
      newState[action.reaction.id] = action.reaction;
      return newState;
    case REMOVE_REACTION:
      delete newState[action.reactionId];
      return newState;
    default:
      return oldState;
  }
};

export default reactionsReducer;