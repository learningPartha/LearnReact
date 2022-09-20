import { createStore, applyMiddleware, compose } from 'redux';
import rootReducers from './reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSTION_COMPOSE__ || compose; // add support for redux dev tools
  return createStore(
    rootReducers,
    initialState,
    //redux immutable state invariant warns if we try to mutate any redux state
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}
