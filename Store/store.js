// import { configureStore} from "@reduxjs/toolkit";
// import rootReducer from "./reducer";

// export const store = configureStore({
//   reducer: {
//     rootReducer
//   },
// });

import { createStore, combineReducers } from 'redux';
import rootReducer from "./reducer";

const configureStore = () => {
return createStore(rootReducer);
}
export default configureStore;