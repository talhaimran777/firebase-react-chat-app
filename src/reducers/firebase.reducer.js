const firebaseReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SETUP_FIREBASE':
      return {
        ...state,
        firebase: action.payload.firebase,
        firestore: action.payload.firestore,
        auth: action.payload.auth,
      };
    default:
      return state;
  }
};

export default firebaseReducer;
