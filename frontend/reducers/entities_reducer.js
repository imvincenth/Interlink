import { combineReducers } from 'redux';

import users from './users_reducer';
import experiences from './experiences_reducer';
import educations from './educations_reducer';
import posts from './posts_reducer';
import comments from './comments_reducer';

export default combineReducers({
  users,
  experiences,
  educations,
  posts,
  comments
});