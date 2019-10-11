import axios from "axios";
import { actionTypes } from "../types";
import { setAuthToken } from "../../utils/setAuthToken";

export const registerUser = (formData, history) => async dispatch => {
  try {
    const res = await axios.post("/api/user/signup", formData);

    dispatch({ type: actionTypes.REGISTER_USER, payload: res.data });
    setAuthToken(res.data.token);
    history.push("/dash");
  } catch (error) {
    dispatch({ type: actionTypes.LOG_IN_ERROR, payload: "Unable to log in" });
  }
};

export const signIn = (formData, history) => async dispatch => {
  try {
    const res = await axios.post("/api/user/signin", formData);
    dispatch({ type: actionTypes.SIGN_IN, payload: res.data });
    setAuthToken(res.data.token);
    history.push("/dash");
  } catch (error) {
    console.error("Action Error!!", error);
    dispatch({ type: actionTypes.LOG_IN_ERROR, payload: "Unable to log in" });
  }
};

//  *** START TOMORROW TESTING THIS !! ***
export const logout = history => async dispatch => {
  try {
    const res = await axios.post("/api/user/logout");
    dispatch({ type: actionTypes.LOG_OUT });
    history.push("/");
  } catch (error) {
    console.error("Action Error!!", error);
  }
};
