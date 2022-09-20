import * as types from './ActionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from './ApiStatusActions';
/*export function createCourse(course) {
  //debugger;
  //for action type create course , payload course is being passed, actions need to have type property
  return { type: types.CREATE_COURSE, course };
}*/

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSES_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSES_SUCCESS, course };
}

export function deleteCourseOptimistic(course) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}

//load course from api
export function loadCourses() {
  return function (dispatch) {
    // thunk function injects dispatch
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses)); // dispatch action to call load courses to load course data from api
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

//save new course
export function saveCourse(course) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    //getState let us access redux store data
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteCourse(course) {
  return function (dispatch) {
    // Doing optimistic delete, so not dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this.
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
}
