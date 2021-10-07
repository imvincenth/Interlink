import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';

export default function modalParamsReducer(state = null, action) {
  switch (action.type) {
    case OPEN_MODAL:
      if (action.params) return action.params;
      return null;
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
}
