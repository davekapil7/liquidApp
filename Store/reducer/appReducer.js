
const initialState = {
 appState : ""
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_STATE":
      return {
        ...state,
        appState: action.payload,
      };
    

    default:
      return state;
  }
};

export default appReducer;
