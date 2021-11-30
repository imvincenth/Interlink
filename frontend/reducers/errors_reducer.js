import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import experienceErrorsReducer from './experiences_errors_reducer';
import educationErrorsReducer from './educations_errors_reducer';
import postErrorsReducer from './posts_errors_reducer';
import commentErrorsReducer from './comments_errors_reducer';
import reactionErrorsReducer from './reactions_errors_reducer';
import userErrorsReducer from './user_errors_reducer';

export default combineReducers({
  session: sessionErrorsReducer,
  users: userErrorsReducer,
  experiences: experienceErrorsReducer,
  educations: educationErrorsReducer,
  posts: postErrorsReducer,
  comments: commentErrorsReducer,
  reactions: reactionErrorsReducer
});