import {
  REGISTER_START,
  SUCCESSFULLY_REGISTERED,
  REGISTER_ERROR,
  CLOSE_MODAL
} from "../actions/types";

let cloneObject = obj => {
  return JSON.parse(JSON.stringify(obj));
};

let initialState = {
  isResultVisible: true,
  registerIsVisible: false,
  menuButtonsIsVisible: false
};

export default function(state = initialState, action) {
  let newState = cloneObject(state);
  switch (action.type) {
    case REGISTER_START:
      newState.saveState = "start";
      return newState;
    case SUCCESSFULLY_REGISTERED:
      newState.isResultVisible = true;
      newState.saveState = "done";
      return newState;
    case REGISTER_ERROR:
      newState.saveState = "error";
      return newState;
    case CLOSE_MODAL:
      newState.isResultVisible = false;
      return newState;
    default:
      return state;
  }
}
