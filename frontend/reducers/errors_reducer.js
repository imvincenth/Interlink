import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import experienceErrorsReducer from './experiences_errors_reducer';
import session from './session_errors_reducer';

export default combineReducers({
  session: sessionErrorsReducer,
  experiences: experienceErrorsReducer
});