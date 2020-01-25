import { combineReducers } from "redux";
import customHeaderReducer from "./customHeaderReducer";
import registerReducer from "./registerReducer";

export default combineReducers({
  customHeader: customHeaderReducer,
  register: registerReducer
});
