const chatReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_CONVERSATION':
      return {
        ...state,
        loading: true,
      };
    case 'SUCCESS_CONVERSATION':
      return {
        ...state,
        loading: false,
        conversation: action.payload,
      };
    case 'NO_CONVERSATION':
      return {
        ...state,
        loading: false,
        conversation: [],
      };
    default:
      return state;
  }
};

export default chatReducer;
