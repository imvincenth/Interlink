import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import CreatePostFormContainer from '../feed/post/create_post_container';
import EditPostFormContainer from '../feed/post/edit_post_container';

function Modal(props) {
  if (!props.modal) {
    return null;
  }
  let component;
  
  switch (props.modal) {
    case 'createPost':
      component = <CreatePostFormContainer />;
      break;
    case 'editPost':
      component = <EditPostFormContainer />;
      break;
    default:
      return null;
  }

  return (
    <div className="feed-modal-background" onClick={props.closeModal}>
      <div className="feed-modal-child" onClick={e => e.stopPropagation()}>
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
