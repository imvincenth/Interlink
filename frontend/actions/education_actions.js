import * as EducationAPIUtil from '../util/education_api_util';

export const RECEIVE_EDUCATIONS = 'RECEIVE_EDUCATIONS';
export const RECEIVE_EDUCATION = 'RECEIVE_EDUCATION';
export const REMOVE_EDUCATION = 'REMOVE_EDUCATION';

const receiveEducations = educations => ({
  type: RECEIVE_EDUCATIONS,
  educations
});

const receiveEducation = education => ({
  type: RECEIVE_EDUCATION,
  education
});

const removeEducation = educationId => ({
  type: REMOVE_EDUCATION,
  educationId
});

export const fetchEducations = () => dispatch => (
  EducationAPIUtil.fetchEducations()
    .then(educations => dispatch(receiveEducations(educations)))
);

export const createEducation = education => dispatch => (
  EducationAPIUtil.createEducation(education)
    .then(education => dispatch(receiveEducation(education)))
);

export const updateEducation = education => dispatch => (
  EducationAPIUtil.updateEducation(education)
    .then(education => dispatch(receiveEducation(education)))
);

export const deleteEducation = educationId => dispatch => (
  EducationAPIUtil.deleteEducation(educationId)
    .then(() => dispatch(removeEducation(educationId)))
);