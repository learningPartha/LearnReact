import * as types from '../actions/ActionTypes';
import initialState from './initialState';

export default function authorReducer(state = initialState.authors, action) {
  //reducers should have state and action

  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    default:
      return state; //return changed state
  }
}
