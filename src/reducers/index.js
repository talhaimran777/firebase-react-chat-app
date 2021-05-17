import { combineReducers } from 'redux';
import firebaseReducer from './firebase.reducer';

let rootReducer = combineReducers({
  firebase: firebaseReducer,
});

export default rootReducer;
