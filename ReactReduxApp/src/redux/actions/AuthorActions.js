import * as types from './ActionTypes';
import * as authorApi from '../../api/authorApi';
import { beginApiCall, apiCallError } from './ApiStatusActions';

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

//load course from api
export function loadAuthors() {
  return function (dispatch) {
    // thunk function injects dispatch
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch(loadAuthorsSuccess(authors)); // dispatch action to call load courses to load course data from api
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
