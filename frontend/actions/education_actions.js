import * as EducationAPIUtil from '../util/education_api_util';

export const RECEIVE_EDUCATIONS = 'RECEIVE_EDUCATIONS';
export const RECEIVE_EDUCATION = 'RECEIVE_EDUCATION';
export const REMOVE_EDUCATION = 'REMOVE_EDUCATION';
export const RECEIVE_EDUCATION_ERRORS = 'RECEIVE_EDUCATION_ERRORS';
export const REMOVE_ERRORS = 'REMOVE_ERRORS';

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

export const receiveErrors = errors => ({
  type: RECEIVE_EDUCATION_ERRORS,
  errors
});

export const removeErrors = () => ({
  type: REMOVE_ERRORS
})

export const fetchEducations = userId => dispatch => (
  EducationAPIUtil.fetchEducations(userId)
    .then(educations => (dispatch(receiveEducations(educations))), 
    err => (dispatch(receiveErrors(err.responseJSON))))
);

export const createEducation = education => dispatch => (
  EducationAPIUtil.createEducation(education)
    .then(education => (dispatch(receiveEducation(education))), 
    err => (dispatch(receiveErrors(err.responseJSON))))
);

export const updateEducation = education => dispatch => (
  EducationAPIUtil.updateEducation(education)
    .then(education => (dispatch(receiveEducation(education))), 
    err => (dispatch(receiveErrors(err.responseJSON))))
);

export const deleteEducation = educationId => dispatch => (
  EducationAPIUtil.deleteEducation(educationId)
    .then(() => (dispatch(removeEducation(educationId))), 
    err => (dispatch(receiveErrors(err.responseJSON))))
);