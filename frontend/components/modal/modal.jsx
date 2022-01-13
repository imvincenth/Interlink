import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import CreateExperienceFormContainer from '../profile/experience/create_experience_container';
import EditExperienceFormContainer from '../profile/experience/edit_experience_container';
import CreateEducationFormContainer from '../profile/education/create_education_container';
import EditEducationFormContainer from '../profile/education/edit_education_container';
import CreatePostFormContainer from '../feed/post/create_post_container';
import EditPostFormContainer from '../feed/post/edit_post_container';
import EditProfileFormContainer from '../profile/edit_profile_container';
import PostShowModalContainer from '../feed/post/post_show_modal_container';
import ProfilePictureModalContainer from '../profile/profile_picture_modal_container';
import BannerModalContainer from '../profile/banner_modal_container';
import BannerShowModalContainer from '../profile/banner_show_container';

function Modal(props) {
  if (!props.modal) {
    return null;
  }
  let component;
  let classType;
  
  switch (props.modal) {
    case 'createExperience':
      classType = 'create-experience';
      component = <CreateExperienceFormContainer />;
      break;
    case 'editExperience':
      classType = 'edit-experience';
      component = <EditExperienceFormContainer />;
      break;
    case 'createEducation':
      classType = 'create-education';
      component = <CreateEducationFormContainer />;
      break;
    case 'editEducation':
      classType = 'edit-education';
      component = <EditEducationFormContainer />;
      break;
    case 'createPost':
      classType = 'create-post';
      component = <CreatePostFormContainer />;
      break;
    case 'editPost':
      classType = 'edit-post';
      component = <EditPostFormContainer />;
      break;
    case 'editProfile':
      classType = 'edit-profile';
      component = <EditProfileFormContainer />;
      break;
    case 'postShow':
      classType = 'post-show';
      component = <PostShowModalContainer />;
      break;
    case 'profilePicture':
      classType = 'profile-picture';
      component = <ProfilePictureModalContainer />;
      break;
    case 'banner':
      classType = 'banner';
      component = <BannerModalContainer />;
      break;
    case 'bannerShow':
      classType = 'banner-show';
      component = <BannerShowModalContainer />;
      break;
    default:
      return null;
  }

  return (
    <div className="modal-background" onClick={props.closeModal}>
      <div className={`${classType}-modal-child`} onClick={e => e.stopPropagation()}>
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
