
const initialState = {
 appState : "",
 cardList: [],
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

    default:
      return state;
  }
};

export default appReducer;
