import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import CreateExperienceFormContainer from '../profile/experience/create_experience_container';
import EditExperienceFormContainer from '../profile/experience/edit_experience_container';

function Modal({modal, closeModal}) {
  if (!modal) {
    return null;
  }
  let component;

  switch (modal) {
    case 'createExperience':
      component = <CreateExperienceFormContainer />;
      break;
    case 'editExperience':
      component = <EditExperienceFormContainer />;
      break;
    case 'createEducation':
      component = <CreateEducationForm />
      break;
    case 'editExperience':
      component = <EditEducationForm />
      break;
    case 'editAbout':
      component = <EditAboutForm />
      break;
    default:
      return null;
  }

  return (
    <div className="modal-background" onClick={closeModal}>
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
