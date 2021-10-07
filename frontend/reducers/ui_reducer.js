import { combineReducers } from "redux";
import modal from "./modal_reducer";
import modalParamsReducer from "./modal_params_reducer";

export default combineReducers({
  modal,
  modalParamsReducer
});