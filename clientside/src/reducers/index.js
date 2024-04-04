import { combineReducers } from "redux";

import authReducer from "../reducers/signupReducer";
import postReducer from "./postReducer";
import chatReducer from "./chatReducer";
import refreshReducer from "./refreshReducer"; // post refresh

//export const reducers = combineReducers({authReducer,postReducer, chatReducer})
export const reducers = combineReducers({authReducer,postReducer, chatReducer,refreshReducer})