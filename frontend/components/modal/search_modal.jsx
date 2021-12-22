import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import SearchSuggestionsContainer from '../search/search_suggestions_container';

function Modal(props) {
  if (!props.modal) {
    return null;
  }
  let component;
  
  switch (props.modal) {
    case 'suggestions':
      component = <SearchSuggestionsContainer />;
      break;
    default:
      return null;
  }

  return (
    <div className="search-modal-background" onClick={props.closeModal}>
      <div className="search-modal-child" onClick={e => e.stopPropagation()}>
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
