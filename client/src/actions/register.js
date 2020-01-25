import axios from "axios";
import {
  REGISTER_START,
  SUCCESSFULLY_REGISTERED,
  REGISTER_ERROR
} from "./types";
import history from "../containers/history";

export const registerUser = (email, score) => async dispatch => {
  dispatch({
    type: REGISTER_START
  });

  const user = {
    email: email,
    score: score
  };

  const registerResponse = await axios.post("/register", user);

  if (registerResponse === "success") {
    dispatch({
      type: SUCCESSFULLY_REGISTERED
    });
  } else {
    dispatch({
      type: REGISTER_ERROR
    });
  }
};
