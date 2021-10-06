import { combineReducers } from 'redux';

import users from './users_reducer';
import experiences from './experiences_reducer';

export default combineReducers({
  users,
  experiences
});