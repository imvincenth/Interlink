import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import CreateExperienceFormContainer from '../profile/experience/create_experience_container';
import EditExperienceFormContainer from '../profile/experience/edit_experience_container';
import CreateEducationFormContainer from '../profile/education/create_education_container';
import EditEducationFormContainer from '../profile/education/edit_education_container';
import CreatePostFormContainer from '../feed/post/create_post_container';
import EditProfileFormContainer from '../profile/edit_profile_container';

function Modal(props) {
  if (!props.modal) {
    return null;
  }
  let component;

  switch (props.modal) {
    case 'createExperience':
      component = <CreateExperienceFormContainer />;
      break;
    case 'editExperience':
      component = <EditExperienceFormContainer />;
      break;
    case 'createEducation':
      component = <CreateEducationFormContainer />;
      break;
    case 'editEducation':
      component = <EditEducationFormContainer />;
      break;
    case 'createPost':
      component = <CreatePostFormContainer />;
      break;
    case 'editProfile':
      component = <EditProfileFormContainer />;
      break;
    default:
      return null;
  }

  return (
    <div className="modal-background" onClick={props.closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mSTP = state => {
  return {
    modal: state.ui.modal
  };
};

const mDTP = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mSTP, mDTP)(Modal);
