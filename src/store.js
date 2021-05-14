import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const state = {};
const middlewares = [thunk];

const store = createStore(
  rootReducer,
  state,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
