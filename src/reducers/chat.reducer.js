const chatReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CHAT':
      return {
        ...state,
        conversation: [...action.payload],
      };
    case 'SET_NEW_CHAT':
      return {
        ...state,
        conversation: [...action.payload.newChat, ...action.payload.prevChat],
      };
    case 'SET_LAST_DOC':
      return {
        ...state,
        lastDoc: action.payload,
      };
    case 'SET_TOTAL':
      return {
        ...state,
        total: action.payload,
      };
    case 'SET_LOADED_MESSAGES':
      return {
        ...state,
        loaded: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
