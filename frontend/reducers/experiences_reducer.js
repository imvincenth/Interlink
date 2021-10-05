import { RECEIVE_EXPERIENCES, RECEIVE_EXPERIENCE, REMOVE_EXPERIENCE } from "../actions/experience_actions";

const experiencesReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  let newState = Object.assign({}, oldState);

  switch (action.type) {
    case RECEIVE_EXPERIENCES:
      return action.experiences;
    case RECEIVE_EXPERIENCE:
      newState[action.experience.id] = action.experience;
      return newState;
    case REMOVE_EXPERIENCE:
      delete newState[action.experienceId];
      return newState;
    default:
      return oldState;
  }
}

export default experiencesReducer;