import { combineReducers } from 'redux';
import firebaseReducer from './firebase.reducer';
import chatReducer from './chat.reducer';

let rootReducer = combineReducers({
  firebase: firebaseReducer,
  chat: chatReducer,
});

export default rootReducer;
