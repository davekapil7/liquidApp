
const initialState = {
 appState : "",
 cardList: [],
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


    default:
      return state;
  }
};

export default appReducer;
