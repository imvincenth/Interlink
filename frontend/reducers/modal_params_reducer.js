import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';

export default function modalParamsReducer(state = null, action) {
  switch (action.type) {
    case OPEN_MODAL:
      console.log("hi")
      return action.params;
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
}
