const firebaseReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SETUP_FIREBASE':
      return {
        ...state,
        firebase: action.payload.firebase,
        firestore: action.payload.firestore,
        auth: action.payload.auth,
      };
    case 'SET_AUTH':
      return {
        ...state,
        auth: action.payload,
      };
    default:
      return state;
  }
};

export default firebaseReducer;
