import { log } from "react-native-reanimated";

const initialState = {
 appState : "",
 login:false,
 cardList: [],
 email: '',
 profileData: {},
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGIN" : 
    return {
      ...state,
      login : action.payload
    }
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
      console.log("Payload",action.payload);
      return {
        ...state,
        profileData: action.payload,
      };
    case "ADD_EMAIL":
      return {
        ...state,
        email: action.payload,
      };
    case "CLEAR_ALL":
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default appReducer;
