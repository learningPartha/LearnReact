import * as types from '../actions/ActionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
  //reducers should have state and action

  switch (action.type) {
    //case types.CREATE_COURSE:
    //debugger;
    case types.CREATE_COURSES_SUCCESS:
      return [...state, { ...action.course }]; //take current state and return updated state
    case types.UPDATE_COURSES_SUCCESS:
      return state.map((course) =>
        course.id === action.course.id ? action.course : course
      );
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter((course) => course.id !== action.course.id);
    default:
      return state; //return changed state
  }
}
