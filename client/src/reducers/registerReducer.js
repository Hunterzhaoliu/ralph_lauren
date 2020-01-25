import {
  SWITCH_POP_UP_VISIBILITY,
  REGISTER_START,
  SUCCESSFULLY_REGISTERED,
  REGISTER_ERROR
} from "../actions/types";

let cloneObject = obj => {
  return JSON.parse(JSON.stringify(obj));
};

let initialState = {
  registerIsVisible: false,
  registerErrors: {},
  menuButtonsIsVisible: false
};

export default function(state = initialState, action) {
  let newState = cloneObject(state);
  switch (action.type) {
    case SWITCH_POP_UP_VISIBILITY:
      const popUpName = action.popUpName;
      // clear out the errors
      newState.registerErrors = {};
      if (popUpName === "register") {
        // need to switch registerIsVisible
        newState.registerIsVisible = !state.registerIsVisible;
        newState.loginIsVisible = false;
        newState.menuButtonsIsVisible = false;
      } else if (popUpName === "menuButtons") {
        newState.menuButtonsIsVisible = !state.menuButtonsIsVisible;
        newState.registerIsVisible = false;
        newState.loginIsVisible = false;
      }
      return newState;
    case REGISTER_START:
      newState.saveState = "start";
      return newState;
    case SUCCESSFULLY_REGISTERED:
      newState.values = action.savedProfile;
      newState.errors = action.profileErrors;
      newState.saveState = "done";
      return newState;
    case REGISTER_ERROR:
      newState.saveState = "error";
      return newState;
    default:
      return state;
  }
}
