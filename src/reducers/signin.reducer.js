const signInReducer = (state = {}, action) => {
  switch (action.type) {
    case '':
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default signInReducer;
