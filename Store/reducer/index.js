
import { combineReducers } from "redux";
import appReducer from "./appReducer";
import certificateReducer from "./certificateReducer";

const rootReducer = combineReducers({
    appstate : appReducer,
    certificate : certificateReducer
});

export default rootReducer;