
import { combineReducers } from "redux";
import appReducer from "./appReducer";

const rootReducer = combineReducers({
    appstate : appReducer
});

export default rootReducer;