import { combineReducers } from 'redux';
import courses from './CourseReducers';
import authors from './AuthorReducers';
import apiCallsInProgress from './ApiStatusReducers';

const rootReducers = combineReducers({
  courses,
  authors,
  apiCallsInProgress
});

export default rootReducers;
