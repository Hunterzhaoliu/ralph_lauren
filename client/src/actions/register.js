import axios from "axios";
import { SWITCH_POP_UP_VISIBILITY, SAVE_REGISTER_ERRORS } from "./types";
import history from "../containers/history";

export const registerUser = newUser => async dispatch => {
  const registerResponse = await axios.post("/register", newUser);

  const registerResponseData = registerResponse.data;
  if (registerResponseData === "success") {
    // pre-emptively close the login that is switched on in the loginUser() function
    dispatch({
      type: SWITCH_POP_UP_VISIBILITY,
      popUpName: "login"
    });
  } else {
    // user sign up has errors
    dispatch({
      type: SAVE_REGISTER_ERRORS,
      registerErrors: registerResponseData
    });
  }
};

// import axios from "axios";
// import {
//   FILL_PROFILE,
//   FILL_PROFILE_ERROR,
//   SAVE_PROFILE_START,
//   SUCCESSFULLY_SAVED_PROFILE,
//   PROFILE_SAVE_ERROR
// } from "./types";
// import { isValidNumber } from "../utils/validateInputs";
//
// export const onProfile = mongoDBUserId => async dispatch => {
//   // fetch user profile
//   const userProfileResponse = await axios.get(
//     "/api/user?mongoDBUserId=" + mongoDBUserId
//   );
//
//   if (userProfileResponse.status === 200) {
//     dispatch({
//       type: FILL_PROFILE,
//       userProfile: userProfileResponse.data.profile
//     });
//   } else {
//     dispatch({ type: FILL_PROFILE_ERROR });
//   }
// };
//
// export const saveProfile = (mongoDBUserId, profile) => async dispatch => {
//   dispatch({
//     type: SAVE_PROFILE_START
//   });
//
//   // need to validate profile information before hitting database
//   // record all of the possible errors and then remove the errors key
//   let profileErrors = profile.errors;
//   delete profile.errors;
//
//   const userAge = profile.age;
//   // check for specific errors
//   // check for age input errors
//   if (userAge === null || userAge === "") {
//     profileErrors.ageError = false;
//   } else if (userAge < 13 || userAge > 100 || !isValidNumber(userAge)) {
//     // input age has an error, don't want to save in database
//     delete profile.age;
//     profileErrors.ageError = true;
//   }
//
//   const profileInfo = { mongoDBUserId: mongoDBUserId, profile: profile };
//   const saveProfileResponse = await axios.put("/api/profile/save", profileInfo);
//
//   if (saveProfileResponse.status === 200) {
//     dispatch({
//       type: SUCCESSFULLY_SAVED_PROFILE,
//       savedProfile: profile,
//       profileErrors: profileErrors
//     });
//   } else {
//     dispatch({ type: PROFILE_SAVE_ERROR });
//   }
// };
