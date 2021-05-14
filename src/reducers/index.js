import { combineReducers } from 'redux';
import signInReducer from './signin.reducer';
import firebaseReducer from './firebase.reducer';

let rootReducer = combineReducers({
  signin: signInReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
