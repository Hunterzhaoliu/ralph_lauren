import axios from "axios";
import {
  REGISTER_START,
  SUCCESSFULLY_REGISTERED,
  REGISTER_ERROR,
  CLOSE_MODAL
} from "./types";

export const registerUser = (email, score) => async dispatch => {
  dispatch({
    type: REGISTER_START
  });

  const user = {
    email: email,
    score: score
  };

  const registerResponse = await axios.post("/api/register", user);

  if (registerResponse.status === 200) {
    dispatch({
      type: SUCCESSFULLY_REGISTERED
    });
  } else {
    dispatch({
      type: REGISTER_ERROR
    });
  }
};

export const closeModal = () => async dispatch => {
  dispatch({
    type: CLOSE_MODAL
  });
};
