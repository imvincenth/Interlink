import * as ReactionAPIUtil from '../util/reaction_api_util';

export const RECEIVE_REACTIONS = "RECEIVE_REACTIONS";
export const RECEIVE_REACTION = "RECEIVE_REACTION";
export const REMOVE_REACTION = "REMOVE_REACTION";
export const CLEAR_REACTIONS = "CLEAR_REACTIONS";

export const RECEIVE_REACTION_ERRORS = "RECEIVE_REACTION_ERRORS";
export const REMOVE_REACTION_ERRORS = "REMOVE_REACTION_ERRORS";
export const REMOVE_ERRORS = "REMOVE_ERRORS";

export const receiveReactions = reactions => {
  return {
    type: RECEIVE_REACTIONS,
    reactions
  }
}

export const receiveReaction = reaction => {
  return {
    type: RECEIVE_REACTION,
    reaction
  }
}

export const removeReaction = reactionId => {
  return {
    type: REMOVE_REACTION,
    reactionId
  }
}

export const clearReactions = () => {
  return {
    type: CLEAR_REACTIONS
  }
}

export const receiveReactionErrors = errors => {
  return {
    type: RECEIVE_REACTION_ERRORS,
    errors
  }
}

export const removeReactionErrors = () => {
  return {
    type: REMOVE_REACTION_ERRORS,
  }
}

export const removeErrors = () => {
  return {
    type: REMOVE_ERRORS,
  }
}

