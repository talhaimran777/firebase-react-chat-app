const chatReducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_CONVERSATION':
      return {
        ...state,
        loadingChats: true,
      };
    case 'SUCCESS_CONVERSATION':
      return {
        ...state,
        loadingChats: false,
        conversation: action.payload,
      };
    case 'NO_CONVERSATION':
      return {
        ...state,
        loadingChats: false,
        conversation: [],
      };
    default:
      return state;
  }
};

export default chatReducer;
