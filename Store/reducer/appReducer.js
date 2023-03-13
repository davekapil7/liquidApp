
const initialState = {
 appState : "",
 cardList: [],
 email: '',
 profileData: {},
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_STATE":
      return {
        ...state,
        appState: action.payload,
      };
    case "ADD_CARDS":
      return {
        ...state,
        cardList: action.payload,
      };
    case "ADD_PROFILE":
      return {
        ...state,
        profileData: action.payload,
      };
    case "ADD_EMAIL":
      return {
        ...state,
        email: action.payload,
      };

    default:
      return state;
  }
};

export default appReducer;
