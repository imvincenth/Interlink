import * as ExperienceAPIUtil from '../util/experience_api_util';

export const RECEIVE_EXPERIENCES = 'RECEIVE_EXPERIENCES';
export const RECEIVE_EXPERIENCE = 'RECEIVE_EXPERIENCE';
export const REMOVE_EXPERIENCE = 'REMOVE_EXPERIENCE';

const receiveExperiences = experiences => ({
  type: RECEIVE_EXPERIENCES,
  experiences
});

const receiveExperience = experience => ({
  type: RECEIVE_EXPERIENCE,
  experience
});

const removeExperience = experienceId => ({
  type: REMOVE_EXPERIENCE,
  experienceId
});

export const fetchExperiences = userId => dispatch => (
  ExperienceAPIUtil.fetchExperiences(userId)
    .then(experiences => dispatch(receiveExperiences(experiences)))
);

export const createExperience = experience => dispatch => (
  ExperienceAPIUtil.createExperience(experience)
    .then(experience => dispatch(receiveExperience(experience)))
);

export const updateExperience = experience => dispatch => (
  ExperienceAPIUtil.updateExperience(experience)
    .then(experience => dispatch(receiveExperience(experience)))
);

export const deleteExperience = experienceId => dispatch => (
  ExperienceAPIUtil.deleteExperience(experienceId)
    .then(() => dispatch(removeExperience(experienceId)))
);